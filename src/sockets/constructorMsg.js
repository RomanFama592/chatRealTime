function emitMsg(msg, client, showUser = true) {
  if (showUser) {
    var msgNew = [new Date().getTime(), `${client.rol}:${client.username} => ${msg}`];
  } else{
    var msgNew = [new Date().getTime(), msg];
  }
  console.log(msgNew)
  return msgNew
}

module.exports = emitMsg;
