// status fields and start button in UI
var result;
var start_recognition;
var stop_recognition;

// subscription key and region for speech services.
var SpeechSDK;
var speechRecognizer;
var AZURE_SPEECH_KEY = "";
var AZURE_SPEECH_REGION = "";
var subscriptionKey = AZURE_SPEECH_KEY;
var serviceRegion = AZURE_SPEECH_REGION;


function startRecognition(){
  start_recognition.disabled = true;
  stop_recognition.disabled = false;

  
  var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
  const languageSelect = document.getElementById('languageSelect').value;
  
  speechConfig.speechRecognitionLanguage = languageSelect;
  var audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  speechRecognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
  speechRecognizer.endSilenceTimeout = 3000;
  var final_text = '';

  speechRecognizer.recognizing = (s, e) => {
    console.log(`RECOGNIZING: Text=${e.result.text}`);
    result.innerHTML = final_text + e.result.text;
  };

  speechRecognizer.recognized = (s, e) => {

    if (e.result.reason == SpeechSDK.ResultReason.RecognizedSpeech) {
      console.log(`RECOGNIZED: Text=${e.result.text}`);
      final_text += e.result.text;
      result.innerHTML = final_text;
    } else if (e.result.reason == SpeechSDK.ResultReason.NoMatch) {
      console.log("NOMATCH: Speech could not be recognized.");
    }
  };

  speechRecognizer.canceled = (s, e) => {
    console.log(`CANCELED: Reason=${e.reason}`);

    if (e.reason == sdk.CancellationReason.Error) {
      console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
      console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
      console.log("CANCELED: Did you set the speech resource key and region values?");
    }

    speechRecognizer.stopContinuousRecognitionAsync();
  };

  speechRecognizer.sessionStopped = (s, e) => {
    console.log("\n    Session stopped event.");
    speechRecognizer.stopContinuousRecognitionAsync();
  };

  speechRecognizer.startContinuousRecognitionAsync(); 
  
}

function stopRecognition() {
  if (speechRecognizer) {
    speechRecognizer.stopContinuousRecognitionAsync();
    start_recognition.disabled = false;
    stop_recognition.disabled = true;
  }
}

function clearResult() {
  final_text = '';
  document.getElementById('result').textContent = '';
}

function textToSpeech(){
  
  startSpeakTextAsyncButton = document.getElementById("speakButton");  
  startSpeakTextAsyncButton.disabled = true;
  var text_to_speech = document.getElementById("text_to_speech");

  
        var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
        speechConfig.speechSynthesisLanguage = document.getElementById('languageSelect').value;
        synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
        

        let inputText = text_to_speech.value;
        synthesizer.speakTextAsync(
          inputText,
          function (result) {
            startSpeakTextAsyncButton.disabled = false;
            if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
              resultDiv.innerHTML += "synthesis finished for [" + inputText + "].\n";
            } else if (result.reason === SpeechSDK.ResultReason.Canceled) {
              resultDiv.innerHTML += "synthesis failed. Error detail: " + result.errorDetails + "\n";
            }
            window.console.log(result);
            synthesizer.close();
            synthesizer = undefined;
          },
          function (err) {
            startSpeakTextAsyncButton.disabled = false;
            resultDiv.innerHTML += "Error: ";
            resultDiv.innerHTML += err;
            resultDiv.innerHTML += "\n";
            window.console.log(err);

            synthesizer.close();
            synthesizer = undefined;
        });
}
document.addEventListener("DOMContentLoaded", function () {
  start_recognition = document.getElementById("startButton");
  stop_recognition = document.getElementById("stopButton");
  clear_button = document.getElementById("clearButton");
  speak_button = document.getElementById("speakButton");


  result = document.getElementById("result");

  result.innerHTML = "";
  start_recognition.addEventListener("click", function () {
    startRecognition();
      });

  stop_recognition.addEventListener("click",function(){
    stopRecognition();
  });

  clear_button.addEventListener('click', function() {
    clearResult();
  });

  languageSelect.addEventListener('change', function() {
    stopRecognition();
  });

  speak_button.addEventListener('click', function() {
    textToSpeech();
  });

});
