const app = require("./src/utils/declaredExpress");
const server = require("./src/utils/declaredHttpServer");
const { io } = require("./src/sockets/socketListener");

server.listen(app.get("port"), (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server escuchando en :${app.get("port")}...`);
});
