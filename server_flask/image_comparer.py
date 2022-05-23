# * --------- IMPORTS --------- *
import os
import re
import time
import numpy as np
import urllib.request as ur
import face_recognition as fr

class ImageComparer():
# * ---- Encode all the Training Images by Linking them to their filenames ---- *    
    
    # Declare all the lists
    def __init__(self):
        self.files = []
        self.known_names = []
        self.face_encodings = []
        self.load_data()
    
    # Loading the Data
    def load_data(self):
        print("\n[flask] Loading data...")
        # Walk in the folder to add every file name to self.files
        for (root, dirs, files) in os.walk('./images'):
            self.files.extend(files)
        # Walk in the folder
        for file in self.files:
            # Load each file
            face = fr.load_image_file("./images/" + file)
            # Extract the name of each student from the filename and add it to self.known_names  
            self.known_names.append(re.sub("[0-9]",'', file[:-4]))
            # Encode the face of each student
            self.face_encodings.append(fr.face_encodings(face)[0])
        print("[flask] Data Loaded successfully!\n")

# * ---- Get the name of the student from the base64 encoded image received from the client ---- *
    def get_name(self, base_64_img):
        # Decoding the base64 string into an image
        decoded_img = ur.urlopen(base_64_img)
        # Loading the image
        fr_img = fr.load_image_file(decoded_img)
        # Detecting faces in the image
        face_locations = fr.face_locations(fr_img)
        # Encode faces in the image 
        face_encodings = fr.face_encodings(fr_img, face_locations)
        # If a face is found in the face_encodings:
        if (face_encodings):
            for fe in face_encodings:
                # See if the unknown face is a match for a known face
                matches = fr.compare_faces(self.face_encodings, fe, tolerance=0.5)
                # Check the known face with the smallest distance to the unknown face
                face_distances = fr.face_distance(self.face_encodings, fe)
                # Take the best one (the one with minimum distance)
                best_match_index = np.argmin(face_distances)
                # If there is a match:
                if matches[best_match_index]:
                # Give the detected face the name of the student that match
                    return self.known_names[best_match_index]
                else:
                # Else if no match is found, return "__denied__"
                    return "__denied__"
        # Else if no face is found in the image, return "__404__" error
        else:
            return "__404__"

# * ---------- SAVE data to send to the API -------- *    
    def get_json(self, base_64_img):
        # Initialise JSON to EXPORT
        json_to_export = {}
        # Save the name
        json_to_export['name'] = self.get_name(base_64_img)
        # Save the time
        json_to_export['hour'] = f'{time.localtime().tm_hour}:{time.localtime().tm_min}'
        # Save the date
        json_to_export['date'] = f'{time.localtime().tm_mday}/{time.localtime().tm_mon}/{time.localtime().tm_year}'
        return json_to_export