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