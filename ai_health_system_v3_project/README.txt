
AI HEALTH SYSTEM VERSION 3

SETUP

1. Open terminal
2. Navigate to backend folder

cd backend

3. Install requirements

pip install -r requirements.txt

4. Train models

python train_models.py

5. Run server

uvicorn main:app --reload

Server URL
http://127.0.0.1:8000

Swagger API Docs
http://127.0.0.1:8000/docs

Test request:

POST /analyze

{
 "symptoms":"Chest pain shortness of breath sweating"
}

Chatbot endpoint

POST /chat

{
 "question":"I have fever what should I do?"
}
