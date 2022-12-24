const socket = io("", { transports: ["websocket"], upgrade: false });
socket.emit("username", prompt("¿como te vas a llamar?"));

const inputText = document.getElementById("inputText");
const chat = document.getElementById("chat-conteiner");
const notification = document.getElementById("notification-conteiner");
const showNotiButton = document.getElementById("showNotiButton");
showNotiButton.checked = false;

inputText.focus();

document.getElementById("buttonNoti").addEventListener("click", () => {
  /* no funciona el hidden
  notification.hidden = !notification.hidden
  //console.log(notification.hidden) */
  //console.log(notification.style.display)
  if (notification.style.display === "inline-block") {
    notification.style.display = "";
  } else if (notification.style.display === "") {
    notification.style.display = "inline-block";
  }
});

showNotiButton.addEventListener("click", async () => {
  const PubliKey = await fetch("/clave-publica").then(res => res.text()).then(data => data)
  if (showNotiButton.checked) {
    showNotiButton.innerText = "Desactivar notificaciones push";
    if ("serviceWorker" in navigator) {
      subscriptionPush(PubliKey)
      .then((value)=>{
        socket.emit("subscriptionPush", value)
      })
      .catch(err => console.error(err))
    }
  } else {
    showNotiButton.innerText = "Activar notificaciones push";
    if(window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations()
      .then(function(registrations) {
        for(let registration of registrations) {
          registration.unregister();
          console.log("worker elimited")
        }
      });
    }
  }
  showNotiButton.checked = !showNotiButton.checked;
});

showNotiButton.click();

document.getElementById("chatForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (inputText.value == "") {
    return alert("Escriba algo para enviar");
  }
  socket.emit("chat", inputText.value);
  inputText.value = "";
  inputText.focus();
});

socket.on("clearChat", () => {
  chat.innerHTML = "";
});

socket.on("chat", (msg) => {
  createMsg(msg);
});

socket.on("notification", (msg) => {
  parseNoti(msg);
  notification.style.display = "inline-block";
});

socket.on("loadChatPrevious", (array) => {
  array.forEach((element) => {
    createMsg(element);
  });
});

socket.on("disconnect", () => {
  location.reload();
});

socket.on("error", (error) => {
  alert(error);
});
