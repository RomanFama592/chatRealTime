function emitMsg(msg, username, showUser = true,) {
  if (showUser) {
    return [new Date().getTime(), `${username}: ${msg}`];
  }
  return [new Date().getTime(), msg];
}

module.exports = emitMsg;
