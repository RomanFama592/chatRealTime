function parseNoti(Obj) {
  let date = new Date(Obj.date);
  let divMain = document.createElement("div");
  divMain.setAttribute("class", "notification");
  divMain.innerHTML = `<h3>${Obj.title}</h3>
    <h4>${Obj.client}</h4><p>${Obj.description}</p><h5>enviado a las ${
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  }:${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  } hs</h5>`;
  notification.appendChild(divMain);
}

function createMsg(msg) {
  msg = `${msg[0] == "" ? "" : Date(msg[0])} ${msg[1]}`;
  let item = document.createElement("li");
  item.textContent = msg;
  item.setAttribute("class", "msg");
  chat.appendChild(item);
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const subscriptionPush = async (PublicKey) => {
  //resolver el error del path
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PublicKey),
  }).then(a => a);

  socket.emit("subscriptionPush", subscription)
};
