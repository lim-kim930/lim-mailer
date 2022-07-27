"use strict";
const LimMailer = require("lim-mailer");

// pass in the mailbox configuration when creating the instance:
const mailer = new LimMailer({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        // Google Mail requires two-step verification：https://myaccount.google.com/security
        // Then create an application-specific password and fill in the pass filed：https://myaccount.google.com/apppasswords
        user: "", // generated Gmail user
        pass: "" // generated Gmail password
        
    },
    alias: "LimMailer"
}, {
    to: [], // list of receivers
    cc: []
});

// or set the outbox and inbox separately:
// mailer.setOutbox({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: "",
//         pass: ""

//     },
//     alias: "LimMailer"
// });

// mailer.setInbox({
//     to: [],
//     cc: []
// });
mailer.sendMail({
    subject: "Hello world", // Subject line
    text: "Welcome to lim-mailer!", // plain text body
    html: "<b>Welcome to lim-mailer!</b>" // HTML body
}).then((info) => {
    console.log("\x1B[2m" + new Date().toLocaleString() + "\x1B[0m \x1B[32msuccess: \x1B[0m");
    console.log(info);
}).catch((err) => {
    console.log("\x1B[2m" + new Date().toLocaleString() + "\x1B[0m \x1B[31merror: \x1B[0m" + err);
})