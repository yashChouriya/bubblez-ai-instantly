from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from celery import Celery
import openai, requests, os, json, re


app = Flask(__name__)
CORS(app)
load_dotenv()

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

    if response.status_code != 200:
        return jsonify(
            {
                "result": "I'm sorry, I didn't quite understand your question. Can you please rephrase it or ask me something else?",
                "status": False,
            }
        )

    json_response = json.loads(response.text)
    clean_summary = re.sub(r"\[[^\]]*\]", "", json_response["summary"])
    return jsonify(
        {
            "result": clean_summary,
            "status": True,
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)
