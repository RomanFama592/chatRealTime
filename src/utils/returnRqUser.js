const Users = require("../databases/Users");

async function returnRqUser(rq, rs, next) {
  if (rq.UserDB === null) {
    return next();
  }

  if(rq.UserDB === undefined){
    rq.UserDB = await Users.findOne({
      where: { sessionID: rq.sessionID },
    }).then((value) => value);
    return next()
  }

  if (rq.sessionID == rq.UserDB.sessionID) {
    rq.session.username = rq.UserDB.username;
    return next();
  }
}

module.exports = returnRqUser;
