const io = require("../utils/declaredSocketIO");
const emitMsg = require("./constructorMsg");
const commands = require("./commands");

var msgCurrentSession = [];

io.on("connection", (client) => {
  console.log(`ip:${client.handshake.headers.host}`);

  client.on("username", (username) => {
    if (username == null || username == "") {
      client.username = client.id;
    } else {
      client.username = username;
    }

    let msgToSend = emitMsg(
      `"${client.username}" se ha conectado...`,
      "",
      false
    );
    client.emit("loadChatPrevious", msgCurrentSession);
    io.emit("chat", msgToSend);
    msgCurrentSession.push(msgToSend);
  });

  client.on("chat", async (msg) => {
    if (msg.slice(0, 1) === "/") {
      let self = { io: io, msg: msg, client: client };

      if (msg.split(" ")[0] == "/clear") {
        msgCurrentSession = [];
      }

      return commands[msg.split(" ")[0]]
        ? commands[msg.split(" ")[0]](self)
        : commands.notCommandFound(self);
    }

    let msgToSend = emitMsg(msg, client.username);
    io.emit("chat", msgToSend);

    msgCurrentSession.push(msgToSend);
  });

  client.on("disconnect", () => {
    let msgToSend = emitMsg(
      `"${client.username}" se ha desconectado...`,
      "",
      false
    );
    io.emit("chat", msgToSend);
    client.disconnect(true);
    msgCurrentSession.push(msgToSend);
  });
});

module.exports = io;
