# Attendance Tracker

## Description

**Attendance Tracker** is an Application that automates attendance. Students can login using their camera either through laptop, tablet or mobile. Teachers can view the record of students who are currently logged in to the site along with their roll numbers, and respective date and time of logging in.

## How does it work?

* **For Students:** 
 A student clicks a photo of herself at the frontend using the react-webcam library in ReactJS. The photo is encoded into a base64 string and this string is sent to the Flask Server. <br/>
 The Flask server first decodes the base64 string back into an image and then this image is compared with the existing training images using the face-recognition library in python. <br/>
 If a match is detected, the roll number, name, date and time of logging in is sent back to the frontend and the student is logged in.<br/> 
 If the face in the captured photo doesn't match with any of the training images an alert is shown.
 Similarly, if no face is detected or multiple faces are detected, an alert is shown.

* **For Teachers:** A teacher enters a password. If the password is correct, the teacher is logged in. Once logged in, a teacher can see the Roll Number, Name, Time of logging in, and the Date of logging in of all the students who are currently logged in. The data of the currently logged in students is stored as a JSON file, which is then sent to the frontend from the NodeJS server once a teacher logs in.<br/>
If the password entered is incorrect, an alert is shown.

## Technologies Used

* **Front-end:** *ReactJS*
* **Back-end:** *Flask* & *NodeJS*
* **Face-Recognition Model:** *Python [Face_recognition](https://github.com/ageitgey/face_recognition) Library*  

## How to Run?

For instructions on how to run the application on your local machine after cloning the repository, go to [setup.md](setup.md)