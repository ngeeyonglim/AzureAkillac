import pytest
import backend.FileUpload
import firebase_admin
from firebase_admin import credentials, storage
from flask import Flask, jsonify, make_response, request
import json
from flask_cors import CORS
import requests
import os
import datetime as datetime

@pytest.fixture()
def app():
  #Initialize flask app
  app = Flask(__name__)
  CORS(app)
    
  # Initialize Firebase Admin SDK with the service account key
  cred = credentials.Certificate('serviceAccountKey.json')

  yield app

@pytest.fixture()
def client(app):
  return app.test_client()
