const io = require("../utils/declaredIO");
const emitNotification = require("./emitNotification");

var msgCurrentSession = [];

io.on("connection", (client) => {
  console.log("connection entrante:", client.id);

  client.emit("loadChatPrevious", msgCurrentSession);

  client.on("chat", (msg) => {
    if (msg.slice(0, 1) !== "/") {
      let msgToSend = `${client.id} (${Date()}): ${msg}`;
      io.emit("chat", msgToSend);

      return msgCurrentSession.push(msgToSend);
    }

    msg = msg.split(" ");

    switch (msg[0]) {
      case "/clear":
        msgCurrentSession = [];
        io.emit("clearChat", "");
        emitNotification(
          io,
          [
            0,
            "limpieza de chats",
            "el usuario que envio la notificacion a limpiado los mensajes",
          ],
          client
        );
        break;

      case "/notification":
        if (msg.length === 3) {
          emitNotification(io, msg, client);
        }
        break;

      default:
        console.log(`no existe ${msg}`);
        break;
    }
  });
});

module.exports = io;
