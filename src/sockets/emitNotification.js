function emitNotification(io, msg, clientUser) {
  io.emit("notification", {
    title: `"${msg[0]}"`,
    client: `de: ${clientUser}`,
    description: `"${msg[1]}"`,
    date: new Date().getTime(),
  });
}

module.exports = emitNotification;
