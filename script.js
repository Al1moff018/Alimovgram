const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chatScreen');
const usernameInput = document.getElementById('usernameInput');
const loginButton = document.getElementById('loginButton');
const groupList = document.getElementById('groupList');
const groupInput = document.getElementById('groupInput');
const createGroupButton = document.getElementById('createGroupButton');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const currentGroup = document.getElementById('currentGroup');

let username = '';
let currentGroupName = '';
const groups = {};

// Login user
loginButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        loginScreen.style.display = 'none';
        chatScreen.style.display = 'flex';
    }
});

// Create a new group
createGroupButton.addEventListener('click', () => {
    const groupName = groupInput.value.trim();
    if (groupName && !groups[groupName]) {
        groups[groupName] = [];
        const groupElement = document.createElement('li');
        groupElement.textContent = groupName;
        groupElement.addEventListener('click', () => selectGroup(groupName));
        groupList.appendChild(groupElement);
        groupInput.value = '';
    }
});

// Select a group
function selectGroup(groupName) {
    currentGroupName = groupName;
    currentGroup.textContent = groupName;
    chatMessages.innerHTML = '';
    groups[groupName].forEach(({ user, message }) => {
        addMessageToUI(user, message);
    });
}

// Add message to UI
function addMessageToUI(user, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${user}: ${message}`;
    chatMessages.appendChild(messageElement);
}

// Send a message
sendButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message && currentGroupName) {
        if (!groups[currentGroupName]) groups[currentGroupName] = [];
        groups[currentGroupName].push({ user: username, message });
        addMessageToUI(username, message);
        chatInput.value = '';
    }
});
