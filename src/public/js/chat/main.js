const socket = io("", { transports: ["websocket"], upgrade: false });
socket.emit("username", prompt("¿como te vas a llamar?"));

const inputText = document.getElementById("inputText");
const chat = document.getElementById("chat-conteiner");
const notification = document.getElementById("notification-conteiner");

inputText.focus();