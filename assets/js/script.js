var recognizing = false;
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

var final_transcript = '';

recognition.onresult = function(event) {
    //console.log("blah");
    //console.log(event.results);

    var interim_transcript = '';
    //$('#inputMirror').innerHTML(event);
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
        } else {
            interim_transcript += event.results[i][0].transcript;
        }
    }

    // inputMirror.value = final_transcript + interim_transcript;
    console.log(final_transcript);
    // console.log(interim_transcript);

    if (final_transcript) {
        window.location.href = '/search_result?q=' + final_transcript;
    }
}

function speechOn(){
    $('#recording').show();
    recognition.start();
    recognizing = true;
}

function speechSwitch(){
    $('#recording').hide();
    if(recognizing){
        recognition.stop();
        recognizing = false;
    }else{
        speechOn();
    }
}

$('#recording').hide();
