## Overview

This repository demonstrates how to create a simple chatbot by combining the power of Flask, Celery, GPT-3 and Superpowered-AI. Flask is used as the web framework to handle HTTP requests and responses, Celery is used as the task queue to run GPT-3 requests asynchronously, and GPT-3 is used as the language generation model to generate text based on the prompts provided by the user.

## Requirements

- Python 3.7 or later
- Flask
- Celery
- Redis (or any other message broker supported by Celery)
- OpenAI API Key (to access GPT-3)

## Usage

1. Clone the repository:
   ```
   git clone git@github.com:yashChouriya/bubblez-ai-instantly.git
   ```
2. Navigate to server folder:
   ```
   cd server
   ```
3. Install the dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Replace `example.env` to `.env` and change `YOUR_API_KEY` in `app.py` with your OpenAI API key.
5. Start the Redis server:
   ```
   redis-server
   ```
6. Start the Celery worker:
   ```
   celery -A app.celery worker --loglevel=info
   ```
7. Start the Flask app:
   ```
   flask run
   ```
8. Send a POST request to `http://localhost:5000/chat-async` with a JSON body containing the prompt, for example (gpt):
   ```
   { "prompt": "What is the capital of France?" }
   ```
9. You will receive a JSON response containing the task id, for example:
   ```
   { "task_id": "8d5f0b5d-a5e5-4b8f-b5f5-5a5a5a5a5a5a" }
   ```
10. Use the task id to check the status of the task and retrieve the generated text by sending a GET request to `http://localhost:5000/result/<task_id>`, for example:
    ```
    http://localhost:5000/result/8d5f0b5d-a5e5-4b8f-b5f5-5a5a5a5a5a5a
    ```

## Docker

1. Copy example.env to .env and give required variables
   ```
   cp example.env .env
   ```
2. Build the Docker image by running the following command in terminal:
   ```
   docker build -t gpt-chat-flask-celery .
   ```
3. Once the image is built, you can run the container using the following command:
   ```
   docker run -p 5000:5000 --name gpt-chat-flask-celery gpt-chat-flask-celery
   ```
4. You can access the application on `http://localhost:5000`

## Limitations

This sample chatbot has some limitations and is just for demonstration purposes.

- It uses GPT-3 with a single endpoint and does not handle pagination.
- It does not handle any form of natural language processing, sentiment analysis, or other advanced features.
- It does not have any form of UI and just accepts and returns json data.

## Contributions

If you find any bugs or would like to add new features, please feel free to open a pull request or an issue.

## License

This repository is released under the MIT license. See [LICENSE](https://github.com/shamspias/chat-gpt-celery-flask/blob/main/LICENSE.md) for more details.

## Test Client

to test this can use this simple client

[React-Client](https://github.com/shamspias/chat-gpt-react-client)
