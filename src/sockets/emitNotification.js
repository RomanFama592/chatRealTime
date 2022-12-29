function emitNotification(io, msg, clientUser) {
  let noti = {
    title: `"${msg[0]}"`,
    client: `de: ${clientUser}`,
    description: `"${msg[1]}"`,
    date: new Date().getTime(),
  };
  io.emit("notification", noti);
  console.log(noti)
}

module.exports = emitNotification;
