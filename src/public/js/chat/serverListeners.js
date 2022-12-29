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

socket.on("error", (error) => {
  alert(error);
});
