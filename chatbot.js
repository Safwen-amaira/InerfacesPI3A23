// DOM Elements
const chatDisplay = document.getElementById('chatDisplay');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const voiceBtn = document.getElementById('voiceBtn');

// Voice Recognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Function to add messages to the chat
function addMessage(message, sender = 'user') {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
    messageDiv.textContent = message;
    chatDisplay.appendChild(messageDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Simulated Bot Response
function botResponse(userMessage) {
    let response = "Je suis désolé, je ne comprends pas.";
    if (userMessage.includes("trajet") || userMessage.includes("offre")) {
        response = "Voici quelques trajets disponibles : Paris-Lyon, Marseille-Nice.";
    } else if (userMessage.includes("bonjour")) {
        response = "Bonjour ! Comment puis-je vous aider ?";
    }
    return response;
}

// Send Button Click Event
sendBtn.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, 'user');
        const botReply = botResponse(userMessage.toLowerCase());
        setTimeout(() => addMessage(botReply, 'bot'), 500);
        userInput.value = '';
    }
});

// Voice Button Click Event
voiceBtn.addEventListener('click', () => {
    recognition.start();
});

// Speech Recognition Event
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    addMessage(transcript, 'user');
    const botReply = botResponse(transcript.toLowerCase());
    setTimeout(() => addMessage(botReply, 'bot'), 500);
};
