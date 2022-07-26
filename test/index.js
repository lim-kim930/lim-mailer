const LimMailer = require("../dist/index");
const fs = require("fs");

const json = fs.readFileSync(__dirname + "/config.json", "utf8");
const config = JSON.parse(json);

const mailer = new LimMailer(config.outbox, config.inbox);
mailer.sendMail(config.content).then(() => {
    console.log("\x1B[2m" + new Date().toLocaleString() + "\x1B[0m \x1B[32msuccess!\x1B[0m");
}).catch((err) => {
    console.log("\x1B[2m" + new Date().toLocaleString() + "\x1B[0m \x1B[31merror: \x1B[0m" + err);
})