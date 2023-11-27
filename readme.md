## Azure JS Continuos Speech Recognition

This project focuses on continuous speech recognition using Azure services. The recognition is performed asynchronously and it isdoneusing a simple web application and javascript. Additionally, a module for text-to-speech conversion is included.

## How to run 

To run this project you will need to open the script.js file and search for the varialbes:

var AZURE_SPEECH_KEY = "";

var AZURE_SPEECH_REGION = "";

and you will have to set the API key and Region of your Azure speech recognition service that you create at the [azure portal](https://portal.azure.com/)


## What you will find:

in the 'script.js' file you will find 4 important functions:

### startRecognition():

is the function that get access to the microphone and start the speech recognition, this function is divided in 4 events that are related with the recognizer engine.

speechRecognizer.recognizing : displays in realtime what is the engine recognizing from the speech

speechRecognizer.recognized: when the user makes a pause in the speechit will take that pause as the beggining of a new phrase, so it will start again a new phrase and will separate the phrases by period(. ) at the moment that the user makes a pause the recognized event will be triggered

speechRecognizer.canceled: if the speech recognition fails or is it canceled then this event is activated.

speechRecognizer.sessionStopped: if it is used the command speechRecognizer.stopContinuousRecognitionAsync then the event will be triggered.


startRecognition functiontriggers the speech recognition module with the following command:
speechRecognizer.startContinuousRecognitionAsync()

### stopRecognition():

it is a function that activates the function speechRecognizer.stopContinuousRecognitionAsync();
which stops the recognition.

### clearResult():

the function cleans all the text areas in the web app, and the main variables, that is done to start again from the beggining

### textToSpeech():

this is a function that uses Azure SpeechSDK to perform text to speech, it takes the text in the 'text_to_speech' cell, and reades with a default voice of azure, that voice can be changed deppending on the language. works on different languages.


to run the client as a web server use the http server of python or any similar , to do that write in the terminal
`python -m http.server 3000`
you have to be in the same folder as the index.html file to run that command

