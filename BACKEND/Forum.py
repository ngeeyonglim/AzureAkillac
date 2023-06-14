import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, request
from datetime import datetime

app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/create_thread', methods=['POST'])
def create_thread():
    author = request.form.get('author')
    thread_content = request.form.get('threadContent')
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    thread_data = {
        'author': author,
        'threadContent': thread_content,
        'timestamp': timestamp
    }

    threads_collection = db.collection('Forum')
    result = threads_collection.add(thread_data)
    return f"Thread created with ID: {result[1].id}"

@app.route('/reply_to_thread', methods=['POST'])
def reply_to_thread():
    author = request.form.get('author')
    parent_id = request.form.get('parentID')
    reply_content = request.form.get('replyContent')
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    reply_data = {
        'author': author,
        'parentID': parent_id,
        'replyContent': reply_content,
        'timestamp': timestamp
    }

    replies_collection = db.collection('replies')
    result = replies_collection.add(reply_data)
    return f"Reply created with ID: {result[1].id}"

if __name__ == '__main__':
    app.run()
