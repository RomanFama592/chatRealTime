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
    scriptsAfter: ["js/chat/utils.js", "js/chat/chat.js"],
  });
});

router.get("/clave-publica", (req, res) => {
  res.status(200).send(process.env.publicKey);
});

module.exports = router;
