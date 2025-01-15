const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const roomInput = document.getElementById('roomInput');
const joinRoomButton = document.getElementById('joinRoomButton');
const roomSelection = document.getElementById('roomSelection');
const chatControls = document.getElementById('chatControls');

let username = prompt("Enter your name:");
let currentRoom = ''; // Store the current room name
const rooms = {}; // Store messages for each room

function addMessage(user, message, room) {
    if (!rooms[room]) {
        rooms[room] = [];
    }
    rooms[room].push({ user, message });

    if (room === currentRoom) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<span class=\"user\">${user}:</span> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function switchRoom(room) {
    currentRoom = room;
    chatMessages.innerHTML = ''; // Clear current messages
    if (rooms[room]) {
        rooms[room].forEach(({ user, message }) => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.innerHTML = `<span class=\"user\">${user}:</span> ${message}`;
            chatMessages.appendChild(messageElement);
        });
    }
    chatMessages.style.display = 'block';
    chatControls.style.display = 'flex';
}

joinRoomButton.addEventListener('click', () => {
    const roomName = roomInput.value.trim();
    if (roomName) {
        switchRoom(roomName);
        roomInput.value = '';
    }
});

sendButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(username, message, currentRoom);
        chatInput.value = '';
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});
