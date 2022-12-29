const emitNotification = require("./emitNotification");
const Users = require("../databases/Users");

function validetyLevel(level, client) {
  if (client.Levelrol < level) {
    client.emit("chat", ["", "::No tienes los permisos para hacer esto."]);
    return true;
  }
  return false;
}

const commands = new Array();

commands.explication = {
  "/help": ["te muestra todos los comandos que puedes hacer actualmente.", 0],
  "/allcommands": ["te muestra todos los comandos que tiene el servidor.", 0],
  "/clear": ["Borra todos los mensajes del chat.", 3],
  "/noti": [
    `Te permite mandar una notificacion a todos los que esten conectados con titulo y descripcion. Ejemplo de uso "/noti titulo descripcion".`,
    2,
  ],
  "/getdb": ["te permite ver todos los usuarios que estan registrados.", 3],
  "/deleteallusers": [
    `te permite eliminar todas las cuentas registradas con el rol de "user".`,
    3,
  ],
  "/changeprivilegesto": [
    `te permite actualizar los permisos de los usuarios. Ejemplo de uso "/changeprivilegesto username rol(admin o user)".`,
    3,
  ],
};

commands["/clear"] = (self) => {
  if (validetyLevel(3, self.client)) {
    return "";
  }

  self.io.emit("clearChat", "");
  emitNotification(
    self.io,
    ["limpieza de chats", "un usuario a limpiado todo los mensajes..."],
    self.client.username
  );
};

commands["/getdb"] = async (self) => {
  if (validetyLevel(3, self.client)) {
    return "";
  }

  const AllUsers = await Users.findAll();
  AllUsers.forEach((user) => {
    self.client.emit("chat", [
      "",
      `-----: user:${user.username} == passwordHash:${user.passwordHash} == rol:${user.rol} :-----`,
    ]);
  });
};

commands["/deleteallusers"] = (self) => {
  if (validetyLevel(3, self.client)) {
    return "";
  }

  Users.destroy({ where: { rol: "user" } }).then((value) => {
    self.client.emit("chat", [
      "",
      `::Se han removido ${value} cuentas de usuarios`,
    ]);
  });
};

commands["/changeprivilegesto"] = async (self) => {
  if (validetyLevel(3, self.client)) {
    return "";
  }

  msgSplitted = self.msg.split(" ");

  if (msgSplitted.length !== 3) {
    return self.client.emit("chat", [
      "",
      `::hay un error en los parametros en "${self.msg}" puede que sea los espacios entre las palabras que no son soportados. "/help" para saber mas sobre los comandos.`,
    ]);
  }

  if (!["user", "admin"].includes(msgSplitted[2])) {
    return self.client.emit("chat", ["", `::el rol seleccionado no existe.`]);
  }

  const user = await Users.findOne({ where: { username: msgSplitted[1] } });

  if (user === null) {
    return self.client.emit("chat", [
      "",
      `::el usuario "${msgSplitted[1]}" no ha sido encontrado.`,
    ]);
  }

  user.rol = msgSplitted[2];
  user.save().then(() => {
    self.client.rol = msgSplitted[2];
    self.client.Levelrol =
      msgSplitted[2] == "admin" ? 3 : msgSplitted[2] == "user" ? 2 : 1;
    console.log(user.rol);
  });

  self.client.disconnect();
};

commands["/noti"] = (self) => {
  if (validetyLevel(2, self.client)) {
    return "";
  }

  if (self.msg.split(" ").length !== 3) {
    return self.client.emit("chat", [
      "",
      `::hay un error en los parametros en "${self.msg}" puede que sea los espacios entre las palabras que no son soportados. "/help" para saber mas sobre los comandos.`,
    ]);
  }

  emitNotification(
    self.io,
    self.msg.split(" ").filter((item, index) => index != 0),
    self.client.username
  );
};

commands["/help"] = (self) => {
  self.client.emit("chat", ["", "::comandos:"]);
  for (key in commands) {
    if (!["/help", "notCommandFound", "explication"].includes(key)) {
      if (self.client.Levelrol < commands.explication[key][1]) {
      } else {
        self.client.emit("chat", [
          "",
          `  --${key}: ${commands.explication[key][0]}`,
        ]);
      }
    }
  }
};

commands["/allcommands"] = (self) => {
  self.client.emit("chat", ["", "::comandos:"]);
  for (key in commands) {
    if (!["/allcommands", "notCommandFound", "explication"].includes(key)) {
      self.client.emit("chat", [
        "",
        `  --${key}: ${commands.explication[key][0]} Nivel de acceso al comando: "${commands.explication[key][1] == 3 ? "admin" : commands.explication[key][1] == 2 ? "user" : "para todos"}"`,
      ]);
    }
  }
};

commands.notCommandFound = (self) => {
  [
    `::el comando "${self.msg.split(" ")[0]}" no existe.`,
    "",
    "",
    "",
    `::"/help" para saber mas sobre los comandos...`,
  ].forEach((msg) => self.client.emit("chat", ["", msg]));
};

module.exports = commands;
