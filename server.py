from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

@app.route("/ask", methods=["POST"])
def ask():
    try:
        data = request.json
        question = data.get("question", "")

        if not question:
            return jsonify({"error": "Question is required"}), 400

        prompt = f"The student is working on a Wokwi simulation experiment. They are currently learning about \"{question}\". Provide step-by-step instructions to implement it."

        response = requests.post(
            "https://api.groq.com/v1/chat/completions",
            json={
                "model": "llama3-70b-8192",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7
            },
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            }
        )

        response_data = response.json()
        answer = response_data["choices"][0]["message"]["content"]

        return jsonify({"answer": answer})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Something went wrong"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
