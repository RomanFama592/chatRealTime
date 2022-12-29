const router = require("express").Router();
const [blockLogin, blockLogout] = require("../utils/blockWithoutLogg.js");

router.get("/", (rq, rs) => {
  rs.render("index", {
    title: "Inicio",
    css: ["css/main.css"],
    userAuth: rq.UserDB != null ? true : false,
    username: rq.UserDB != null ? rq.UserDB.username : null,
    scriptsBefore: [],
    scriptsAfter: [],
  });
});

router.get("/signup", blockLogin, (rq, rs) => {
  rs.render("signup", {
    title: "Sign Up",
    css: ["css/main.css"],
    scriptsBefore: [],
    scriptsAfter: [
      "js/signup/main.js",
      "js/signup/utils.js",
      "js/signup/events.js",
    ],
  });
});

router.get("/login", blockLogin, (rq, rs) => {
  rs.render("login", {
    title: "Log in",
    css: ["css/main.css"],
    scriptsBefore: [],
    scriptsAfter: [
      "js/login/main.js",
      "js/login/utils.js",
      "js/login/events.js",
    ],
  });
});

router.get("/logout", blockLogout, (rq, rs) => {
  rq.session.regenerate((err) => console.log(err));
  rs.redirect("/");
});

router.get("/chat", blockLogout, (rq, rs) => {
  rs.render("chat", {
    title: "Chat global",
    css: ["css/main.css"],
    username: rq.UserDB != null ? rq.UserDB.username : null,
    scriptsBefore: ["/socket.io/socket.io.js"],
    scriptsAfter: [
      "js/chat/main.js",
      "js/chat/events.js",
      "js/chat/utils.js",
      "js/chat/serverListeners.js",
    ],
  });
});

router.get("*", (rq, rs) => {
  let path = rq.path;
  rs.render("404", {
    title: path,
    error: `la ruta "${path}" no existe.`,
    css: [],
    scriptsBefore: [],
    scriptsAfter: [],
  });
});

module.exports = router;
