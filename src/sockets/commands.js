const emitNotification = require("./emitNotification");

const commands = new Array();

commands["/clear"] = (self) => {
  self.io.emit("clearChat", "");
  emitNotification(
    self.io,
    ["limpieza de chats", "un usuario a limpiado todo los mensajes..."],
    self.client.username
  );
};

commands["/noti"] = (self) => {
  if (self.msg.split(" ").length === 3) {
    emitNotification(
      self.io,
      self.msg.split(" ").filter((item, index) => index != 0),
      self.client.username
    );
  } else {
    self.client.emit("chat", [
      "",
      `::hay un error en los parametros en "${self.msg}" puede que sea los espacios entre las palabras que no son soportados. "/help" para saber mas sobre los comandos.`,
    ]);
  }
};

commands["/help"] = (self) => {
  self.client.emit("chat", ["", "::comandos:"]);
  for (key in commands) {
    if (!["/help", "notCommandFound"].includes(key)) {
      self.client.emit("chat", ["", `  --${key}`]);
    }
  }
};

commands.notCommandFound = (self) => {
  self.client.emit("chat", [
    "",
    `::el comando "${self.msg.split(" ")[0]}" no existe.`,
  ]);
  self.client.emit("chat", [
    "",
    `--"/help" para saber mas sobre los comandos.`,
  ]);
};


module.exports = commands