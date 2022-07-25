import LimMailer from "lim-mailer";

const mailer = new LimMailer({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        // Google Mail requires two-step verification：https://myaccount.google.com/security
        // Then create an application-specific password and fill in the pass filed：https://myaccount.google.com/apppasswords
        user: "1625753207lim@gmail.com", // generated Gmail user
        pass: "lknvytxxmwgouylx" // generated Gmail password

    },
    alias: "LimMailer"
});

mailer.setInbox({
    to: ["1625753207@qq.com"], // list of receivers
    cc: []
});
(async () => {
    const info = await mailer.sendMail({
        subject: "Hello world", // Subject line
        text: "Welcome to lim-mailer!", // plain text body
        html: "<b>Welcome to lim-mail!</b>" // HTML body
    });
    console.log(info);
})();