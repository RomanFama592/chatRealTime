const io = require("../utils/declaredIO");
const emitNotification = require("./emitNotification");

var msgCurrentSession = [];

io.on("connection", (client) => {
  var commands = new Array();

  commands["/clear"] = () => {
    msgCurrentSession = [];
    io.emit("clearChat", "");
    emitNotification(
      io,
      [
        0,
        "limpieza de chats",
        "el usuario que envio la notificacion a limpiado los mensajes",
      ],
      client.username
    );
  };
  commands["/noti"] = (msg) => {
    if (msg.length === 3) {
      emitNotification(io, msg.split(" "), client.username);
    } else {
      client.emit(
        "chat",
        `::hay un error en los parametros ${msg} "/help" para saber mas sobre los comandos`
      );
    }
  };

  commands["/help"] = () => {
    client.emit("chat", "::comandos:");
    for (key in commands) {
      if (!["/help", "notCommandFound"].includes(key)) {
        client.emit("chat", ` --${key}`);
      }
    }
  };

  commands.notCommandFound = (msg) => {
    client.emit(
      "chat",
      `::el comando ${msg} no existe "/help" para saber mas sobre los comandos`
    );
  };

  client.on("username", (username) => {
    client.username = username;
    let msgToSend = `(${Date()}): "${client.username}" se a conectado...`;
    console.log("connection entrante:", client.username);
    client.emit("loadChatPrevious", msgCurrentSession);
    io.emit("chat", msgToSend);
  });

  client.on("chat", (msg) => {
    if (msg.slice(0, 1) !== "/") {
      let msgToSend = `(${Date()}) // ${client.username}: ${msg}`;
      io.emit("chat", msgToSend);
      return msgCurrentSession.push(msgToSend);
    }

    commands[msg.split(" ")[0]]
      ? commands[msg.split(" ")[0]](msg)
      : commands.notCommandFound(msg);
  });

  client.on("disconnect", () => {
    if (client.username != undefined) {
      console.log("end connection:", client.username);
      let msgToSend = `(${Date()}): "${client.username}" se a desconectado...`;
      io.emit("chat", msgToSend);
    }
  });
});

module.exports = io;
