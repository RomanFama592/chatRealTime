const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Inicio",
    css: ["css/main.css"],
    scriptsBefore: [],
    scriptsAfter: [],
  });
});

router.get("/chat", (req, res) => {
  res.render("chat", {
    title: "Chat global",
    css: ["css/main.css"],
    scriptsBefore: ["/socket.io/socket.io.js"],
    scriptsAfter: [
      "js/chat/main.js",
      "js/chat/utils.js",
      "js/chat/serverListeners.js",
      "js/chat/events.js",
    ],
  });
});

router.get("/login", (req, res) => {
  res.render()
});

module.exports = router;
