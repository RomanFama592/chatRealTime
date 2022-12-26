function emitMsg(msg, username, showUser = true) {
  if (showUser) {
    var msgNew = [new Date().getTime(), `${username} => ${msg}`];
  } else{
    var msgNew = [new Date().getTime(), msg];
  }
  console.log(msgNew)
  return msgNew
}

module.exports = emitMsg;
