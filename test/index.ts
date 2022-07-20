import LimMailer from "../src";
import fs from "fs"

// Google Mail requires two-step verification：https://myaccount.google.com/security
// Then create an application-specific password and fill in the pass filed：https://myaccount.google.com/apppasswords

const json = fs.readFileSync(__dirname + "/config.json", "utf8");

const config = JSON.parse(json)

const name = new LimMailer(config.outbox);

name.setInbox(config.inbox)

name.sendMail(config.content).then((info) => {
    console.log("\x1B[2m" + new Date().toLocaleString() + "\x1B[0m \x1B[32msuccess!\x1B[0m");
}).catch((err: Error) => {
    console.log("\x1B[2m" + new Date().toLocaleString() + "\x1B[0m \x1B[31merror: \x1B[0m" + err);
})