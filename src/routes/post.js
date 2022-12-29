const router = require("express").Router();
const verifyRegister = require("../utils/verifyRegister");
const verifyLogin = require("../utils/verifyLogin");
const bcrypt = require("bcryptjs");
const Users = require("../databases/Users");

router.post("/signup", async (rq, rs) => {
  const dataUser = rq.body;

  const response = verifyRegister(dataUser);

  if (!response.validate) {
    return rs.send(response);
  }

  bcrypt.genSalt(5, (err, salt) => {
    if (err) {
      return console.log(err);
    }
    bcrypt.hash(dataUser.password, salt, async (err, hash) => {
      if (err) {
        return console.log(err);
      }

      const [user, created] = await Users.findOrCreate({
        where: { username: dataUser.username },
        defaults: { passwordHash: hash, sessionID: rq.sessionID, rol: "user" },
      });

      if (!created) {
        response.validate = false;
        response.error = 4;
        return rs.send(response);
      }

      rq.session.username = dataUser.username;
      rq.session.rol = "user";
      return rs.send(response);
    });
  });
});

router.post("/login", async (rq, rs) => {
  const dataUser = rq.body;

  const response = verifyLogin(dataUser);

  if (!response.validate) {
    return rs.send(response);
  }

  const user = await Users.findOne({
    where: { username: dataUser.username },
  }).then((value) => value);

  if (user === null) {
    response.validate = false;
    response.error = 7;
    return rs.send(response);
  }

  if (!bcrypt.compareSync(dataUser.password, user.passwordHash)) {
    response.validate = false;
    response.error = 7;
    return rs.send(response);
  }

  user.sessionID = rq.sessionID;
  rq.session.username = user.username;
  rq.session.rol = user.rol;
  user.save();
  rs.send(response);
});

module.exports = router;
