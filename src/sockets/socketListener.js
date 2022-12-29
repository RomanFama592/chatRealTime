const io = require("../utils/declaredSocketIO");
const emitMsg = require("./constructorMsg");
const Users = require("../databases/Users");
const commands = require("./commands");

var msgCurrentSession = [];

io.on("connection", (client) => {
  client.on("username", async (username) => {
    const user = await Users.findOne({ where: { username: username } }).then(
      (value) => value
    );
    client.username = username;
    client.Levelrol = user.rol == "admin" ? 3 : user.rol == "user" ? 2 : 1;
    client.rol = user === null ? "NULL" : user.rol.toUpperCase();

    let msgToSend = emitMsg(
      `"${client.rol}:${client.username}" se ha conectado...`,
      "",
      false
    );
    client.emit("loadChatPrevious", msgCurrentSession);
    io.emit("chat", msgToSend);
    msgCurrentSession.push(msgToSend);
  });

  client.on("chat", (msg) => {
    if (msg.slice(0, 1) === "/") {
      let self = { io: io, msg: msg, client: client };

      if (msg.split(" ")[0] == "/clear") {
        msgCurrentSession = [];
      }

      return commands[msg.split(" ")[0]]
        ? commands[msg.split(" ")[0]](self)
        : commands.notCommandFound(self);
    }

    let msgToSend = emitMsg(msg, client);
    io.emit("chat", msgToSend);

    msgCurrentSession.push(msgToSend);
  });

  client.on("disconnect", () => {
    if(client.username === undefined){
      return ""
    }
    let msgToSend = emitMsg(
      `"${client.rol}:${client.username}" se ha desconectado...`,
      "",
      false
    );
    io.emit("chat", msgToSend);
    client.disconnect(true);
    msgCurrentSession.push(msgToSend);
  });
});

module.exports = io;
