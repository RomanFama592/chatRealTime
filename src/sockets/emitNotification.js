function emitNotification(io, msg, client) {
  io.emit("notification", {
    title: msg[1],
    client: `${client.id}`,
    description: msg[2],
    date: Date(),
  });
}

module.exports = emitNotification;
