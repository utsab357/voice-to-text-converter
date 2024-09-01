window.onload = function () {
    const startRecordBtn = document.getElementById('start-record-btn');
    const stopRecordBtn = document.getElementById('stop-record-btn');
    const status = document.getElementById('status');
    const transcript = document.getElementById('transcript');

    let recognition;
    let isRecording = false;

    // Check for browser support
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
        recognition = new SpeechRecognition();
    } else {
        status.textContent = "Your browser does not support Speech Recognition.";
        startRecordBtn.disabled = true;
        stopRecordBtn.disabled = true;
        return;
    }

    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = function () {
        isRecording = true;
        startRecordBtn.disabled = true;
        stopRecordBtn.disabled = false;
        status.textContent = "Recording...";
    };

    recognition.onend = function () {
        isRecording = false;
        startRecordBtn.disabled = false;
        stopRecordBtn.disabled = true;
        status.textContent = "Recording stopped.";
    };

    recognition.onresult = function (event) {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            }
        }
        transcript.value += finalTranscript + ' ';
    };

    startRecordBtn.onclick = function () {
        if (!isRecording) {
            recognition.start();
        }
    };

    stopRecordBtn.onclick = function () {
        if (isRecording) {
            recognition.stop();
        }
    };
};
