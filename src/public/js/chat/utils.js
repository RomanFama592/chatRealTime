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
  msg = `${msg[0]=="" ? "":Date(msg[0])} ${msg[1]}`;
  let item = document.createElement("li");
  item.textContent = msg;
  chat.appendChild(item);
}
