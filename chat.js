// Reconnaissance vocale
document.getElementById('voiceInputBtn').addEventListener('click', function () {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
        return;
    }

    let recognition = new webkitSpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.interimResults = true;

    recognition.start();

    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        document.getElementById('messageInput').value = transcript;
    };

    recognition.onerror = function(event) {
        alert("Erreur de reconnaissance vocale : " + event.error);
    };
});

// Gestion de la caméra pour la traduction de la langue des signes
let video = document.getElementById('video');
let signText = document.getElementById('signText');

// Démarre la caméra
function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            document.getElementById('signLangFeed').style.display = 'block';
            // Initier TensorFlow.js ou d'autres outils de reconnaissance des signes ici
            // Exemple : utiliser un modèle de reconnaissance des signes
        })
        .catch(function (err) {
            console.log("Erreur d'accès à la caméra: " + err);
        });
}

document.getElementById('cameraInputBtn').addEventListener('click', startCamera);

// Vous pouvez intégrer une librairie comme TensorFlow.js pour la reconnaissance des signes
