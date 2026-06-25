console.log("JavaScript loaded");


document.addEventListener("DOMContentLoaded", () => {

const messageInput = document.querySelector(".message-input");
const sendButton = document.querySelector(".send-btn");
const messagesList = document.querySelector(".messages");

console.log("Elements found:",
    messageInput,
    sendButton,
    messagesList
);

function sendMessage() {

    const text = messageInput.value.trim();

    if (text === "") return;

    const messageBubble = document.createElement("div");
    messageBubble.classList.add("message", "sent");

    const messageText = document.createElement("p");
    messageText.textContent = text;

    const timestamp = document.createElement("span");
    timestamp.classList.add("timestamp");

    timestamp.textContent = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    messageBubble.appendChild(messageText);
    messageBubble.appendChild(timestamp);

    messagesList.appendChild(messageBubble);

    messageInput.value = "";

    messageBubble.scrollIntoView({
        behavior: "smooth"
    });
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

});
