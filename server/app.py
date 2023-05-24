from dotenv import load_dotenv
from flask import Flask, request, jsonify, redirect, session, send_file
from flask_cors import CORS
from celery import Celery
import openai, requests, os, json, re, spacy
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from heapq import nlargest
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)
import re
from crawler import get_all_urls
from datetime import timedelta
from datetime import datetime
from flask_migrate import Migrate
from sqlalchemy import JSON, Enum, Column
import tempfile
import uuid
import xmltodict
import base64
import hashlib, pathlib
import superpowered
from sqlalchemy.orm import relationship, class_mapper
from dataclasses import dataclass
from function_finder import find_executable_function

# from rephrase import rephrase_paragraph

# from google.oauth2 import id_token
# from google.auth.transport import requests
# from google_auth_oauthlib.flow import Flow
# from google.auth.transport.requests import requests as google_requests

app = Flask(__name__)
CORS(app)
load_dotenv()

app.config["SECRET_KEY"] = "your-secret-key"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///pemian-ai.db"  # SQLite database file
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "super-secret-key"
app.config["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


# User model
@dataclass
class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    chatbots = relationship("Chatbot", backref="user")


@dataclass
class Chatbot(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(255), nullable=False)
    data = db.Column(db.Text, nullable=True)
    kb_id = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey("user.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    files = relationship("File", backref="chatbot")
    links = relationship("Link", backref="chatbot")
    qa = relationship("QA", backref="chatbot")


@dataclass
class File(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(255), nullable=False)
    no_of_characters = db.Column(db.Integer, nullable=True)
    document_id = db.Column(db.String(255), nullable=False)
    chatbot_id = db.Column(db.String(36), db.ForeignKey("chatbot.id"), nullable=False)
    superpowered_metadata = db.Column(JSON, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


@dataclass
class Link(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    url = db.Column(db.Text, nullable=False)
    no_of_characters = db.Column(db.Integer, nullable=True)
    document_id = db.Column(db.String(255), nullable=False)
    chatbot_id = db.Column(db.String(36), db.ForeignKey("chatbot.id"), nullable=False)
    superpowered_metadata = db.Column(JSON, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


@dataclass
class QA(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=False)
    no_of_characters = db.Column(db.Integer, nullable=True)
    document_id = db.Column(db.String(255), nullable=False)
    chatbot_id = db.Column(db.String(36), db.ForeignKey("chatbot.id"), nullable=False)
    superpowered_metadata = db.Column(JSON, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


class ChatHistory(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    message_from = db.Column(
        db.Enum("bot", "human", name="message_from_enum"), nullable=False
    )
    message = db.Column(db.Text, nullable=False)
    chatbot_id = db.Column(db.String(36), db.ForeignKey("chatbot.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


# Configure Celery here we use radis
app.config["CELERY_BROKER_URL"] = os.getenv("CELERY_BROKER_URL")
app.config["CELERY_RESULT_BACKEND"] = os.getenv("CELERY_RESULT_BACKEND")

celery = Celery(app.name, broker=app.config["CELERY_BROKER_URL"])
celery.conf.update(app.config)

# GPT-3 endpoint and credentials
gpt3_endpoint = "https://api.openai.com/v1/engines/text-davinci-003/completions"
gpt3_image_endpoint = "https://api.openai.com/v1/images/generations"
gpt3_api_key = os.getenv("OPEN_AI_KEY")
openai.api_key = gpt3_api_key


superpowered_ai_base_url = "https://api.superpowered.ai/v1"
SUPERPOWERED_API_KEY_ID = os.getenv("SUPERPOWERED_AI_API_KEY")
SUPERPOWERED_API_KEY_SECRET = os.getenv("SUPERPOWERED_AI_API_SECRET")
SUPERPOWERED_TOKEN = base64.b64encode(
    (f"{SUPERPOWERED_API_KEY_ID}:{SUPERPOWERED_API_KEY_SECRET}").encode("utf-8")
).decode("utf-8")
#

"client_secret.json"
superpowered.init(
    api_key_id=SUPERPOWERED_API_KEY_ID, api_key_secret=SUPERPOWERED_API_KEY_SECRET
)

# flow = Flow.from_client_secrets_file(  # Flow is OAuth 2.0 a class that stores all the information on how we want to authorize our users
#     client_secrets_file="./client_secret.json",
#     scopes=[
#         "https://www.googleapis.com/auth/userinfo.profile",
#         "https://www.googleapis.com/auth/userinfo.email",
#         "openid",
#     ],  # here we are specifing what do we get after the authorization
#     redirect_uri="http://127.0.0.1:5000/callback",  # and the redirect URI is the point where the user will end up after the authorization
# )

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"

# export SUPERPOWERED_API_KEY_ID=SUPERPOWERED_API_KEY_ID
# export SUPERPOWERED_API_KEY_SECRET=SUPERPOWERED_API_KEY_SECRET


# Validate email format
def is_valid_email(email):
    email_regex = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    return re.match(email_regex, email)


# Validate password strength
def is_valid_password(password):
    # Password must be at least 8 characters long
    if len(password) < 8:
        return False
    return True


def validate_url(url):
    regex_pattern = r"^(http|https)://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?$"
    match = re.match(regex_pattern, url)
    return match is not None


# Helper function to convert User object to dictionary
def user_to_dict(user):
    return {"id": user.id, "name": user.name, "email": user.email}


@celery.task
def generate_text(prompt):
    # Send request to GPT-3
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {gpt3_api_key}",
    }
    data = {"prompt": prompt, "temperature": 0.5, "max_tokens": 300}
    response = requests.post(gpt3_endpoint, headers=headers, json=data)

    # Return response
    return response.json()


@app.route("/", methods=["GET"])
def ping():
    return jsonify({"message": "server is running", "status": True})


@app.route("/chat-async", methods=["POST"])
def chat_async():
    # Get prompt from client
    prompt = request.json.get("prompt")

    # Run GPT-3 task asynchronously
    task = generate_text.apply_async(args=(prompt,))

    # Return task id
    return jsonify({"task_id": task.id})


@app.route("/result/<task_id>", methods=["GET"])
def result(task_id):
    # Get task result
    response = generate_text.AsyncResult(task_id).get()
    result = response["choices"][0]["text"]
    result = result[2:]
    # Return response
    return jsonify({"result": result})


def get_all_knowledge_bases():
    response = requests.get(
        url=f"{superpowered_ai_base_url}/knowledge_bases",
        auth=(SUPERPOWERED_API_KEY_ID, SUPERPOWERED_API_KEY_SECRET),
    )
    knowledge_base_ids = []

    if response.status_code != 200:
        return knowledge_base_ids

    json_response = json.loads(response.text)

    for knowledge_base in json_response["knowledge_bases"]:
        knowledge_base_ids.append(knowledge_base["id"])

    return knowledge_base_ids


def find_top_3_relative_sentences(paragraph, sentences, json_data):
    model = SentenceTransformer("paraphrase-MiniLM-L6-v2")

    # Encode the paragraph and sentences into sentence embeddings
    paragraph_embedding = model.encode([paragraph])[0]
    sentence_embeddings = model.encode(sentences)

    # Calculate the cosine similarity between the paragraph and sentences
    similarities = cosine_similarity([paragraph_embedding], sentence_embeddings)[0]

    # Find the top 3 most similar sentences based on similarity score
    top_3_relative_indices = nlargest(
        3, range(len(similarities)), key=lambda i: similarities[i]
    )
    top_3_relative_sentences = [json_data[index] for index in top_3_relative_indices]

    return top_3_relative_sentences


@app.route("/message-response", methods=["POST"])
def test_superpowered_ai():
    prompt = request.json.get("prompt")
    knowledge_bases = get_all_knowledge_bases()
    request_payload = {
        "knowledge_base_ids": knowledge_bases,
        "query": prompt,
        "summarize_results": True,
    }

    response = requests.post(
        url=f"{superpowered_ai_base_url}/knowledge_bases/query",
        auth=(SUPERPOWERED_API_KEY_ID, SUPERPOWERED_API_KEY_SECRET),
        json=request_payload,
    )

    with open("instantlyFaqUrls.json", "r") as file:
        json_data = json.load(file)
        array_of_titles = [obj["title"] for obj in json_data]
        top_three_relative_urls = find_top_3_relative_sentences(
            prompt, array_of_titles, json_data
        )
        print(top_three_relative_urls)

    if response.status_code != 200:
        return jsonify(
            {
                "result": "I'm sorry, I didn't quite understand your question. Can you please rephrase it or ask me something else?",
                "relative_urls": top_three_relative_urls,
                "status": False,
            }
        )

    json_response = json.loads(response.text)
    clean_summary = re.sub(r"\[[^\]]*\]", "", json_response["summary"])
    return jsonify(
        {
            "result": clean_summary,
            "relative_urls": top_three_relative_urls,
            "status": True,
        }
    )


# API routes
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    name = data.get("name", None)
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing fields!"}), 400

    if not is_valid_email(email):
        return jsonify({"error": "Invalid email address!"}), 400

    if not is_valid_password(password):
        return (
            jsonify(
                {
                    "error": "Invalid password! Password must be at least 8 characters long."
                }
            ),
            400,
        )

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already registered!"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    user = User(name=name, email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created successfully!"})


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing fields!"}), 400

    if not is_valid_email(email):
        return jsonify({"error": "Invalid email address!"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password!"}), 401

    access_token_expires = timedelta(hours=24)
    access_token = create_access_token(
        identity=user.id, expires_delta=access_token_expires
    )
    return jsonify({"token": access_token, "user": user_to_dict(user)})


@app.route("/me", methods=["GET"])
@jwt_required()
def protected():
    user_id = get_jwt_identity()
    existing_user = User.query.filter_by(id=user_id).first()
    if not existing_user:
        return jsonify({"error": "Data not found"}), 401
    return jsonify(
        {
            "message": f"Protected resource, user_id: {user_id}",
            "user": user_to_dict(existing_user),
        }
    )


def extract_urls_from_sitemap(sitemap_url):
    urls = set()
    try:
        response = requests.get(sitemap_url)
        data = response.content
        sitemap_dict = xmltodict.parse(data)
        sitemaps = sitemap_dict.get("sitemapindex", {}).get("sitemap", [])
        result_to_loop = sitemaps
        if not len(result_to_loop):
            try:
                result_to_loop = sitemap_dict["urlset"]["url"]
            except Exception as e:
                print(e)
                result_to_loop = []

        for sitemap in result_to_loop:
            urls.add(sitemap["loc"])

        return urls
    except Exception as e:
        print(e)
        return urls


@app.route("/fetch-links", methods=["POST"])
@jwt_required()
def run_crawler():
    try:
        data = request.get_json()
        url = data.get("url", None)
        fetch_method = data.get("method", "URL")

        if not url or not validate_url(url):
            return jsonify({"error": "URL is invalid", "status": False}), 400

        all_urls = []
        results = []
        if fetch_method == "URL":
            results = list(get_all_urls(url=url, max_depth=1))
        else:
            results = list(extract_urls_from_sitemap(sitemap_url=url))

        for url in results:
            all_urls.append({"link": url})

        return (
            jsonify(
                {
                    "message": "Crawled successfully",
                    "data": all_urls,
                    "status": True,
                }
            ),
            201,
        )
    except Exception as e:
        print(e)
        return jsonify({"error": "URL is invalid", "status": False}), 400


def create_knowledge_base(user, text_data):
    try:
        request_payload = {
            "title": text_data["name"],
            "supp_id": user.id,
            "description": text_data["data"],
        }

        response = requests.post(
            url=f"{superpowered_ai_base_url}/knowledge_bases",
            auth=(SUPERPOWERED_API_KEY_ID, SUPERPOWERED_API_KEY_SECRET),
            json=request_payload,
        )

        if response.status_code != 200:
            return None

        json_response = json.loads(response.text)

        return json_response
    except Exception as e:
        print(e)
        return None


def upload_url_to_kb(url, kb_id):
    try:
        request_payload = {
            "url": url,
            "title": url.split("/")[-1],
        }

        response = requests.post(
            url=f"{superpowered_ai_base_url}/knowledge_bases/{kb_id}/documents/url",
            auth=(SUPERPOWERED_API_KEY_ID, SUPERPOWERED_API_KEY_SECRET),
            json=request_payload,
        )
        if response.status_code != 200:
            return None

        json_response = json.loads(response.text)

        return json_response
    except Exception as e:
        print(e)
        return False


def upload_raw_text_to_kb(name, data, kb_title):
    try:
        response = superpowered.add_document_to_kb(
            kb_title=kb_title, content=data, title=name, description=data
        )
        return True
    except Exception as e:
        print(e)
        return False


def upload_file_to_kb(kb_id, file_path):
    try:
        # set url
        url = f"{superpowered_ai_base_url}/knowledge_bases/{kb_id}/documents/request_signed_file_url"

        # read contents of file
        with open(file_path, "rb") as f:
            contents = f.read()
            md5 = hashlib.md5(contents)
            encoded_md5 = base64.b64encode(md5.digest()).decode("utf-8")

        request_upload_payload = {
            "filename": file_path.split("/")[-1],
            "method": "PUT",
            "encoded_md5": encoded_md5,
        }

        headers = {"Authorization": f"Bearer {SUPERPOWERED_TOKEN}"}
        # get the presigned url
        resp = requests.post(
            url,
            headers=headers,
            json=request_upload_payload,
        )
        resp_data = json.loads(resp.text)

        if resp.status_code != 200:
            return resp_data

        upload_url = resp_data["temporary_url"]

        # upload the file
        headers = {
            "Content-MD5": encoded_md5,
        }

        resp = requests.put(upload_url, data=contents, headers=headers)
        # resp_data = json.loads(resp.text)

        if resp.status_code != 200:
            return resp_data

        return resp_data
    except Exception as e:
        print(e)
        return e


def get_documents_in_kb(kb_id):
    headers = {"Authorization": f"Bearer {SUPERPOWERED_TOKEN}"}
    response = requests.get(
        f"{superpowered_ai_base_url}/knowledge_bases/{kb_id}/documents", headers=headers
    )
    response_data = json.loads(response.text)
    return response_data["documents"]


@app.route("/create-new-chatbot", methods=["POST"])
@jwt_required()
def create_new_chatbot():
    try:
        user_id = get_jwt_identity()
        data = request.form
        urls = data.get("urls", None)
        document = request.files.get("file", None)
        text_data = data.get("text", None)
        questions_and_answers = data.get("QAs", None)

        user = User.query.filter_by(id=user_id).first()
        text_data = json.loads(text_data)

        knowledge_base = create_knowledge_base(user, text_data)
        if not knowledge_base:
            return jsonify({"error": "Failed to created chatbot", "status": False}), 400

        chatbot = Chatbot(
            name=text_data["name"],
            data=text_data["data"],
            kb_id=knowledge_base["id"],
            user_id=user_id,
        )
        db.session.add(chatbot)
        db.session.commit()

        if urls:
            urls = json.loads(urls)
            for url in urls:
                url_response = upload_url_to_kb(url["link"], knowledge_base["id"])
                if not url_response:
                    continue

        if document:
            # Assuming `document` is the uploaded file
            original_filename = document.filename
            temp_dir = tempfile.gettempdir()  # Get the system's temporary directory

            # Generate a unique name for the temporary file using the original filename
            temp_file = tempfile.NamedTemporaryFile(
                prefix="", dir=temp_dir, delete=False
            )
            temp_file_name = temp_file.name
            temp_file.close()  # Close the file to release the handle

            # Create the full temporary file path by appending the original filename
            temp_file_path = os.path.join(temp_dir, original_filename)

            # Save the uploaded document to the temporary file
            document.save(temp_file_path)

            upload_file_to_kb(kb_id=knowledge_base["id"], file_path=temp_file_path)

        if questions_and_answers:
            questions_and_answers = json.loads(questions_and_answers)
            for block in questions_and_answers:
                upload_raw_text_to_kb(
                    name=block["question"],
                    data=block["answer"],
                    kb_title=knowledge_base["title"],
                )

        documents_in_kb = get_documents_in_kb(kb_id=knowledge_base["id"])

        for document in documents_in_kb:
            if document["document_type"] == "raw_text":
                try:
                    answer = document["content"]
                except KeyError:
                    answer = document["description"]

                db.session.add(
                    QA(
                        document_id=document["id"],
                        chatbot_id=chatbot.id,
                        superpowered_metadata=document,
                        question=document["title"],
                        answer=answer,
                    )
                )

            if document["document_type"] == "url":
                db.session.add(
                    Link(
                        document_id=document["id"],
                        chatbot_id=chatbot.id,
                        superpowered_metadata=document,
                        url=document["link_to_source"],
                    )
                )

            if document["document_type"] == "file":
                db.session.add(
                    File(
                        document_id=document["id"],
                        chatbot_id=chatbot.id,
                        superpowered_metadata=document,
                        name=document["title"],
                    )
                )

        db.session.commit()

        return (
            jsonify(
                {
                    "message": "Chatbot created successfully",
                    "status": True,
                }
            ),
            201,
        )
    except Exception as e:
        print(e)
        return jsonify({"error": "URL is invalid", "status": False}), 400


@app.route("/my-chatbots", methods=["GET"])
@jwt_required()
def get_my_bots():
    try:
        user_id = get_jwt_identity()
        chatbots = Chatbot.query.filter_by(user_id=user_id)
        serialized_bots = []
        for bot in chatbots:
            serialized_bots.append(
                {
                    "id": bot.id,
                    "name": bot.name,
                    "data": bot.data,
                    "kb_id": bot.kb_id,
                    "user_id": bot.user_id,
                }
            )

        return jsonify({"data": serialized_bots, "status": True})
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to get chatbot data", "status": False}), 400


# def serialize_chatbot(chatbot):
#     try:
#         pass
#     except Exception as e:
#         print(e)
#         return {}


@app.route("/chatbot/<uid>", methods=["GET"])
@jwt_required()
def get_chatbot_by_id(uid):
    try:
        user_id = get_jwt_identity()
        chatbot = Chatbot.query.filter_by(id=uid, user_id=user_id)[0]
        return jsonify(
            {
                "data": {
                    "id": chatbot.id,
                    "name": chatbot.name,
                    "data": chatbot.data,
                    "kb_id": chatbot.kb_id,
                    "user_id": chatbot.user_id,
                },
                "status": True,
            }
        )
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to get chatbot data", "status": False}), 400


@app.route("/find-function", methods=["POST"])
def find_function_by_query():
    try:
        data = request.get_json()
        query = data.get("query")
        result = find_executable_function(query)
        if result is None:
            return jsonify({"error": "Could not find executable function"}), 400

        response = jsonify(
            {
                "data": result,
                "status": True,
            }
        )
        response.headers["Content-Security-Policy"] = "script-src 'self' 'unsafe-eval'"
        return response
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to get chatbot data", "status": False}), 400


def add_message_in_chat_history(message_from, message, chatbot_id):
    try:
        saved_message = ChatHistory(
            message_from=message_from, message=message, chatbot_id=chatbot_id
        )
        saved_message
        db.session.add(saved_message)
        db.session.commit()
        return True
    except Exception as e:
        print(e)
        return False


@app.route("/chatbot/<uid>/message", methods=["POST"])
@jwt_required()
def new_message(uid):
    user_id = get_jwt_identity()
    chatbot = Chatbot.query.filter_by(id=uid, user_id=user_id)[0]
    prompt = request.json.get("message")
    add_message_in_chat_history(
        message_from="human", message=prompt, chatbot_id=chatbot.id
    )
    request_payload = {
        "knowledge_base_ids": [chatbot.kb_id],
        "query": prompt,
        "summarize_results": True,
    }

    response = requests.post(
        url=f"{superpowered_ai_base_url}/knowledge_bases/query",
        auth=(SUPERPOWERED_API_KEY_ID, SUPERPOWERED_API_KEY_SECRET),
        json=request_payload,
    )

    error_message = "I'm sorry, I didn't quite understand your question. Can you please rephrase it or ask me something else?"

    if response.status_code != 200:
        add_message_in_chat_history(
            message_from="bot", message=error_message, chatbot_id=chatbot.id
        )
        return (
            jsonify(
                {
                    "message": error_message,
                    "status": False,
                }
            ),
            400,
        )

    json_response = json.loads(response.text)
    clean_summary = re.sub(r"\[[^\]]*\]", "", json_response["summary"])

    add_message_in_chat_history(
        message_from="bot", message=clean_summary, chatbot_id=chatbot.id
    )

    return jsonify(
        {
            "message": clean_summary,
            "status": True,
        }
    )


@app.route("/chatbot/<uid>/messages", methods=["GET"])
def get_chat_history(uid):
    try:
        messages = ChatHistory.query.filter_by(chatbot_id=uid)
        history = []
        for message in messages:
            history.append(
                {
                    "by": message.message_from,
                    "text": message.message,
                    "feedback_submitted": True,
                    "feedback": "Yes",
                    "created_at": message.created_at,
                }
            )

        return jsonify(
            {
                "history": history,
                "status": True,
            }
        )
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to get chatbot data", "status": False}), 400


# @app.route("/google/login")  # the page where the user can login
# def google_login():
#     (
#         authorization_url,
#         state,
#     ) = flow.authorization_url()
#     session["state"] = state
#     # asking the flow class for the authorization (login) url
#     return redirect(authorization_url)


# @app.route(
#     "/callback"
# )  # this is the page that will handle the callback process meaning process after the authorization
# def callback():
# flow.fetch_token(authorization_response=request.url)

# if not session["state"] == request.args["state"]:
#     jsonify({})  # state does not match!

# credentials = flow.credentials
# request_session = google_requests.session()
# token_request = google_requests.Request(session=request_session)

# id_info = id_token.verify_oauth2_token(
#     id_token=credentials._id_token, request=token_request, audience=GOOGLE_CLIENT_ID
# )

# session["google_id"] = id_info.get("sub")  # defing the results to show on the page
# session["name"] = id_info.get("name")
# return redirect(
#     "/protected_area"
# )  # the final page where the authorized users will end up


@app.route("/embed.js")
def serve_js_file():
    return send_file("../embedable-client/dest/embed.js", mimetype="text/javascript")


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
