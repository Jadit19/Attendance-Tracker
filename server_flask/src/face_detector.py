import os
import cv2
import base64
import numpy as np

class FaceDetector():
    def __init__(self):
        self.__casc_path = os.path.dirname(cv2.__file__) + "/data/haarcascade_frontalface_default.xml"
        self.__face_cascade = cv2.CascadeClassifier(self.__casc_path)

# * ------ Detecting the face in the image ------ *
    def get_marked_img(self, base_64_img):
        encoded_data = base_64_img.split(',')[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        cv_img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        cv_gray = cv2.cvtColor(cv_img, cv2.COLOR_BGR2GRAY)
        faces = self.__face_cascade.detectMultiScale(
            cv_gray,
            scaleFactor = 1.1,
            minNeighbors = 5,
            minSize = (30, 30),
            flags = cv2.CASCADE_SCALE_IMAGE
        )
        # Displaying a Rectangular Box around the face detected in the image
        x, y, w, h = faces[0]
        cv2.rectangle(cv_img, (x, y), (x+w, y+h), (0, 255 , 0), 4)
        retval, buffer_img = cv2.imencode('.webp', cv_img)
        data = base64.b64encode(buffer_img)
        new_img = "data:image/webp;base64," + str(data)
        return_img = new_img[0:23] + new_img[25:-1]
        return return_img
