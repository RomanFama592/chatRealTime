const socket = io("", { transports: ["websocket"], upgrade: false }).connect();

let username = document.getElementById("username").innerHTML;

socket.emit("username", username);

const inputText = document.getElementById("inputText");
const chat = document.getElementById("chat-conteiner");
const notification = document.getElementById("notification-conteiner");

inputText.focus();
