const server = require("./declaredHttpServer");
const { Server } = require("socket.io");

const io = new Server(server);

module.exports = io;
