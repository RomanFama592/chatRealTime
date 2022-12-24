const webPush = require("web-push");

webPush.setVapidDetails(process.env.IP, process.env.publicKey, process.env.privateKey)

module.exports = webPush;
