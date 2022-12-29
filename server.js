require("dotenv").config();
const db = require("./src/databases/initDB");
const Users = require("./src/databases/Users");
const app = require("./src/utils/declaredExpress");
const server = require("./src/utils/declaredHttpServer");

require("./src/sockets/socketListener");

server.listen(app.get("port"), (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server escuchando en :${app.get("port")}...`);

  db.sync(/* { force: true } */).then((value) => {
    console.log(`Database: "${value.config.database}" is connected...`);
    Users.findOrCreate({
      where: { username: process.env.ADMINUSER },
      defaults: { passwordHash: process.env.ADMINPASSWORD, rol: "admin" },
    });
  });
});
