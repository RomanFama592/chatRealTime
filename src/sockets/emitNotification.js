function emitNotification(io, msg, clientUser) {
  let date = new Date()
  io.emit("notification", {
    title: `"${msg[1]}"`,
    client: `de: ${clientUser}`,
    description: `"${msg[2]}"`,
    date: `enviado a las ${date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes()}`,
  });
}

module.exports = emitNotification;
