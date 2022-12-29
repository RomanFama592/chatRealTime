document.getElementById("buttonNoti").addEventListener("click", () => {
  //notification.hidden = !notification.hidden

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

