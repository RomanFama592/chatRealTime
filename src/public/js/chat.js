const socket = io({transports: ['websocket'], upgrade: false});

const inputText = document.getElementById("inputText");
const chat = document.getElementById("chat-conteiner");
const chatForm = document.getElementById("chatForm");
const notification = document.getElementById("notification-conteiner");

document.getElementById("buttonNoti").addEventListener("click", () => {
    /* no funciona el hidden
  notification.hidden = !notification.hidden
  //console.log(notification.hidden) */
  //console.log(notification.style.display)
  if (notification.style.display === "inline-block") {
    notification.style.display = "";
  } else if (notification.style.display === ""){
    notification.style.display = "inline-block";
  }
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (inputText.value == "") {
    return alert("Escriba algo para enviar");
  }
  socket.emit("chat", inputText.value);
  inputText.value = "";
});

function parseNoti(Obj) {
  let divMain = document.createElement("div");
  divMain.setAttribute("class", "notification");
  divMain.innerHTML = `<h3>${Obj.title}</h3>
  <h4>${Obj.client}</h4><p>${Obj.description}</p><h5>${Obj.date}</h5>`;
  notification.appendChild(divMain);
}

function createMsg(msg) {
  let item = document.createElement("li");
  item.textContent = msg;
  chat.appendChild(item);
}

socket.on("clearChat", () => {
  chat.innerHTML = ""
});

socket.on("loadChatPrevious", (array) => {
  array.forEach((element) => {
    createMsg(element);
  });
});

socket.on("chat", (msg) => {
  createMsg(msg);
});

socket.on("notification", (msg) => {
  parseNoti(msg);
  notification.style.display = "inline-block";
});

