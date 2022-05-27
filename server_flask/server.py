# * ---------- IMPORTS --------- *
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import dotenv_values
from src.image_comparer import ImageComparer
from src.face_detector import FaceDetector

image_comparer = ImageComparer()
face_detector = FaceDetector()

PORT = dotenv_values(".env")['FLASK_PORT']

# * ---------- Create App --------- *
app = Flask(__name__)
CORS(app, support_credentials=True)

# * -----------  ROUTES ----------- *
# * ---- Get base64 encoded image from client ---- *
@app.route('/post_img', methods=['POST'])
def post_img():
    global image_comparer, face_detector
    if request.method == 'POST':
        _data = request.get_json()
        _json = image_comparer.get_json(_data['base64Img'])
        _name = _json['name']
        if (_name != '__404__') and (_name != '__denied__') and (_name != '__multiple__'):
            _json['image'] = face_detector.get_marked_img(_data['base64Img'])
        return jsonify(_json)

# * ------- RUN SERVER on port 5000 ------- *
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=PORT, debug=True)