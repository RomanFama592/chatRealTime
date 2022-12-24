const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Inicio",
    css: ["css/main.css"],
    scriptsBefore: [],
    scriptsAfter: []
  });
});

router.get("/chat", (req, res) => {
  res.render("chat", {
    title: "Chat global",
    css: ["css/main.css"],
    scriptsBefore: ["/socket.io/socket.io.js"],
    scriptsAfter: ["js/chat/utils.js", "js/chat/chat.js"]
  });
});

module.exports = router;
