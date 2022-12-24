const io = require("../utils/declaredIO");
const emitNotification = require("./emitNotification");
const emitMsg = require("./constructorMsg");

var msgCurrentSession = [];

io.on("connection", (client) => {
  var commands = new Array();

  commands["/clear"] = () => {
    msgCurrentSession = [];
    io.emit("clearChat", "");
    emitNotification(
      io,
      [
        "limpieza de chats",
        "un usuario a limpiado todo los mensajes...",
      ],
      client.username
    );
  };

  commands["/noti"] = (msg) => {
    if (msg.split(" ").length === 3) {
      emitNotification(
        io,
        msg.split(" ").filter((item, index) => index != 0),
        client.username
      );
    } else {
      client.emit("chat", [
        "",
        `::hay un error en los parametros en ${msg} puede que sea los espacios entre las palabras que no son soportados. "/help" para saber mas sobre los comandos.`,
      ]);
    }
  };

  commands["/help"] = () => {
    client.emit("chat", ["", "::comandos:"]);
    for (key in commands) {
      if (!["/help", "notCommandFound"].includes(key)) {
        client.emit("chat", ["", `  --${key}`]);
      }
    }
  };

  commands.notCommandFound = (msg) => {
    client.emit("chat", [
      "",
      `::el comando ${msg} no existe "/help" para saber mas sobre los comandos.`,
    ]);
  };

  client.on("username", (username) => {
    console.log(username)
    client.username = username != null ? username : client.id;
    let msgToSend = emitMsg(`"${client.username}" se ha conectado...`, "", false);
    client.emit("loadChatPrevious", msgCurrentSession);
    io.emit("chat", msgToSend);
    console.log(msgToSend);
    msgCurrentSession.push(msgToSend);
  });

  client.on("chat", (msg) => {
    if (msg.slice(0, 1) !== "/") {
      let msgToSend = emitMsg(msg, client.username);
      io.emit("chat", msgToSend);
      console.log(msgToSend);
      return msgCurrentSession.push(msgToSend);
    }

    commands[msg.split(" ")[0]]
      ? commands[msg.split(" ")[0]](msg)
      : commands.notCommandFound(msg);
  });

  client.on("disconnect", () => {
    let msgToSend = emitMsg(
      `"${client.username}" se ha desconectado...`,
      "",
      false
    );
    io.emit("chat", msgToSend);
    console.log(msgToSend);
    client.disconnect(true);
    msgCurrentSession.push(msgToSend);
  });
});

module.exports = io;
