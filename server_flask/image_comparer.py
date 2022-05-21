import os
import re
import time
import numpy as np
import urllib.request as ur
import face_recognition as fr

class ImageComparer():
    def __init__(self):
        self.files = []
        self.known_names = []
        self.face_encodings = []
        self.load_data()

    def load_data(self):
        print("Loading data..")
        for (root, dirs, files) in os.walk('./images'):
            self.files.extend(files)
        for file in self.files:
            face = fr.load_image_file("./images/" + file)
            self.known_names.append(re.sub("[0-9]",'', file[:-4]))
            self.face_encodings.append(fr.face_encodings(face)[0])
        print("Data Loaded successfully!")

    def get_name(self, base_64_img):
        print(base_64_img[0:20])
        print("")
        decoded_img = ur.urlopen(base_64_img)
        fr_img = fr.load_image_file(decoded_img)
        face_locations = fr.face_locations(fr_img)
        face_encodings = fr.face_encodings(fr_img, face_locations)
        if (face_encodings):
            for fe in face_encodings:
                matches = fr.compare_faces(self.face_encodings, fe, tolerance=0.5)
                face_distances = fr.face_distance(self.face_encodings, fe)
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    return self.known_names[best_match_index]
                else:
                    return "__denied__"
        else:
            return "__404__"

    def get_json(self, base_64_img):
        json_to_export = {}
        json_to_export['name'] = self.get_name(base_64_img)
        json_to_export['hour'] = f'{time.localtime().tm_hour}:{time.localtime().tm_min}'
        json_to_export['date'] = f'{time.localtime().tm_year}-{time.localtime().tm_mon}-{time.localtime().tm_mday}'
        return json_to_export