import firebase_admin
from firebase_admin import credentials, storage
from flask import Flask, jsonify
import json

app = Flask(__name__)

class FBconnection:
  def __init__(self):
    # Initialize Firebase Admin SDK
    cred = credentials.Certificate('path/to/serviceAccountKey.json')
    self.app = firebase_admin.initialize_app(cred, {
        'storageBucket': 'akillac-f1499.appspot.com'
    })

    # Get a reference to the default Firebase Storage bucket
    self.bucket = storage.bucket(app=self.app)

    #Initialize flask app


  # @app.route('/upload', methods=['POST'])
  # def upload_file(src_file_path, module_code, year, sem, ans_qns):
  #   # Input for ans_qns = Answers or Questions

  #   destination_path = f'{module_code}_{year}Sem{sem}{ans_qns}'
  #   # Get a reference to the default Firebase Storage bucket
  #   bucket = storage.bucket()

  #   # Upload the file to Firebase Storage
  #   blob = bucket.blob(destination_path)
  #   blob.upload_from_filename(src_file_path)

  @app.route('/upload', methods=['POST'])
  def upload_file_from_Flask(src_file, module_code, year, sem, ans_qns):
    #Need to send a request with the key 'pdf file' hosting the pdf file (through form submission)
    pdf_file = request.files['pdf_file']
    if pdf_file:
        # Upload the PDF file to Firebase Storage directly from memory
        destination_path = f'{module_code}_{year}Sem{sem}{ans_qns}'
        blob = bucket.blob(destination_path)
        blob.upload_from_file(pdf_file)

        return 'File uploaded to Firebase Storage successfully'
    else:
        return 'No file uploaded'

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
    file_content = blob.download_as_bytes()

    # Create a Flask response with the file content
    response = make_response(file_content)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = f'attachment; filename={file_name}'


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
          next_file['semester'] = parts[1][7:8]
          next_file['midOrFinals'] = parts[1][8:11]
          next_file['ansOrQuestions'] = parts[1][11:].split('.')[0]
          files.append(next_file)
      
      ret = json.dumps(files)

      return ret


