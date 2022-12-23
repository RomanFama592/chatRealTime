const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/chat", (req, res) => {
  res.render("chat", {
    title: "Chat global",
    css: ["css/chat.css"],
    scriptsBefore: ["/socket.io/socket.io.js"],
    scriptsAfter: ["/js/chat.js"]
  });
});

module.exports = router;
