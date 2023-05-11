from dotenv import load_dotenv
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from celery import Celery
import openai, requests, os

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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)
