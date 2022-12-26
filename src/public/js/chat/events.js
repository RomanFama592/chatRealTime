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

document.getElementById("chatForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (inputText.value == "") {
    return alert("Escriba algo para enviar");
  }
  socket.emit("chat", inputText.value);
  inputText.value = "";
  inputText.focus();
});
