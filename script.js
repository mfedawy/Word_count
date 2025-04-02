<meta name='viewport' content='width=device-width, initial-scale=1'/><!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عداد الكلمات في الكلام العربي</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; direction: rtl; }
        button { padding: 10px; font-size: 18px; margin: 10px; cursor: pointer; }
        #result { font-size: 24px; margin-top: 20px; }
    </style>
</head>
<body>

    <h1>عداد الكلمات في الكلام العربي</h1>
    <button id="start">ابدأ التسجيل</button>
    <button id="stop">أوقف التسجيل</button>
    <p id="status">اضغط "ابدأ" للبدء</p>
    <h2>الكلمات المتكررة:</h2>
    <div id="result"></div>

    <script src="script.js"></script>

</body>
</html><script>const wordsToTrack = ["السلام", "مرحبا", "شكرا", "جيد"]; // الكلمات التي نريد عدها

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const statusText = document.getElementById("status");
const resultDiv = document.getElementById("result");

let recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.lang = "ar-SA"; // اللغة العربية
recognition.continuous = true;
recognition.interimResults = true;

let wordCounts = {};

// بدء التسجيل
startBtn.addEventListener("click", () => {
    recognition.start();
    statusText.innerText = "يتم الاستماع...";
});

// إيقاف التسجيل
stopBtn.addEventListener("click", () => {
    recognition.stop();
    statusText.innerText = "تم إيقاف الاستماع.";
});

// معالجة النص المستلم من التعرف على الكلام
recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript + " ";
        }
    }
    processText(transcript);
};

// تحليل النص وعدّ الكلمات
function processText(text) {
    wordCounts = {}; // إعادة تعيين العدادات
    wordsToTrack.forEach(word => {
        let count = (text.match(new RegExp(`\\b${word}\\b`, "g")) || []).length;
        wordCounts[word] = count;
    });

    displayResults();
}

// عرض النتائج
function displayResults() {
    resultDiv.innerHTML = "";
    for (let word in wordCounts) {
        resultDiv.innerHTML += `<p>${word}: ${wordCounts[word]}</p>`;
    }
}</script>