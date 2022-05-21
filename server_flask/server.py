from flask import Flask, request, jsonify
from flask_cors import CORS
from image_comparer import ImageComparer

image_comparer = ImageComparer()

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/post_img', methods=['POST'])
def post_img():
    global image_comparer
    if request.method == 'POST':
        _data = request.get_json()
        _json = image_comparer.get_json(_data)
        return jsonify(_json)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)