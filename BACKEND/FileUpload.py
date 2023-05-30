import firebase_admin
from firebase_admin import credentials, storage
from flask import Flask, jsonify, make_response, request
import json
from flask_cors import CORS
import requests


#Initialize flask app
app = Flask(__name__)
CORS(app)


# Initialize Firebase Admin SDK

cred = credentials.Certificate('serviceAccountKey.json')
fb_app = firebase_admin.initialize_app(cred, {
    'storageBucket': 'akillac-f1499.appspot.com'
})
# Get a reference to the default Firebase Storage bucket
bucket = storage.bucket(app=fb_app)



# @app.route('/upload', methods=['POST'])
# def upload_file(src_file_path, module_code, year, sem, ans_qns):
#   # Input for ans_qns = Answers or Questions

#   destination_path = f'{module_code}_{year}Sem{sem}{ans_qns}'
#   # Get a reference to the default Firebase Storage bucket
#   bucket = storage.bucket()

#   # Upload the file to Firebase Storage
#   blob = bucket.blob(destination_path)
#   blob.upload_from_filename(src_file_path)

# courseCode, pypYear, semester, midOrFinals, ansOrQuestions, file
@app.route('/upload', methods=['POST'])
def upload_file_from_Flask():
  courseCode = request.form['courseCode']
  pypYear = request.form['pypYear']
  semester = request.form['semester']
  midOrFinals = request.form['midOrFinals']
  ansOrQuestions = request.form['ansOrQuestions']
  file_url = request.files['file']

  # bucket = storage.bucket()

  if file_url:
  #       r = requests.get(file_url)
        
  #       if r.status == 200:
  #           pdf_data = r.data
            
  #           # Upload the PDF file to Firebase Storage
  #           destination_path = f'{courseCode}_{pypYear}{semester}{midOrFinals}{ansOrQuestions}'
  #           bucket = storage.bucket()
  #           blob = bucket.blob(destination_path)
  #           blob.upload_from_string(pdf_data, content_type='application/pdf')

  #           return 'File uploaded to Firebase Storage successfully'
  #       else:
  #           return 'Failed to retrieve the file from the provided URL'
  # else:
  #       return 'File URL not provided'
    destination_path = f'{courseCode}_{pypYear}{semester}{midOrFinals}{ansOrQuestions}'
    bucket = storage.bucket()
    blob = bucket.blob(destination_path)
    blob.upload_from_file(file_url)
    return 'hi'
  

# %%
## TO EDIT CUrrently using flask

@app.route('/download', methods=['GET'])
def download_file(module_code, year, sem, ans_qns):
  # Input for ans_qns = Answers or Questions

  destination_path = f'{module_code}_{year}Sem{sem}{ans_qns}'
  # Get a reference to the default Firebase Storage bucket
  bucket = storage.bucket()

  # Upload the file to Firebase Storage
  blob = bucket.blob(destination_path)
  file_content = blob.download_to_file()

  # Create a Flask response with the file content
  response = make_response(file_content)
  response.headers['Content-Type'] = 'application/pdf'
  response.headers['Content-Disposition'] = f'attachment; filename={destination_path}'



  return response


# def upload_file_from_blob(b, module_code, year, sem, ans_qns):
#     # Input for ans_qns = Answers or Questions
    
#     destination_path = f'{module_code}_{year}Sem{sem}{ans_qns}'
#     # Get a reference to the default Firebase Storage bucket
#     bucket = storage.bucket()

#     # Download the file from the URL
#     file_content = b.file[0].preview

#     # Upload the file to Firebase Storage
#     blob = bucket.blob(destination_path)
#     blob.upload_from_string(file_content, content_type='application/pdf')

#     return 'File uploaded to Firebase Storage successfully'

# %% [markdown]
# b = [{path: "tut3.pdf", preview: "blob:http://localhost:3000/9f05a114-70bc-498b-bbc4-576feb72984e"}]
# upload_file(b, 'btest', 2022, 2, 'Answer')



@app.route('/getFileNames', methods=['GET'])
def get_file_names_and_paths():
    # Get a reference to the default Firebase Cloud Storage bucket
    bucket = storage.bucket()
    
    files = []

    # List all files and folders in the bucket
    blobs = bucket.list_blobs()

    # Extract file names and paths from the blobs
    # Iterate over the blobs and print the file names
    for blob in blobs:
      if not blob.name.endswith('/'):
        file_name = blob.name
        parts =  file_name.split('_')
        next_file = {}
        next_file['courseCode'] = parts[0]
        next_file['pypYear'] = parts[1][0:4]
        next_file['semester'] = parts[1][4:8]
        next_file['midOrFinals'] = parts[1][8:11]
        if next_file['midOrFinals'] == 'Fin':
           next_file['midOrFinals'] = 'Finals'
        else:
           next_file['midOrFinals'] = 'Midterms'
        next_file['ansOrQuestions'] = parts[1][11:].split('.')[0]
        files.append(next_file)
    
    response = make_response(json.dumps(files))

    return response


if __name__ == '__main__':
    app.run()


