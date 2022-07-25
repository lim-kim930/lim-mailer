# lim-mailer

#### A simple package mailer based on nodemailer.

#### More intuitive and convenient.

## Installation

#### LimMailer requires **Node.js v6.0.0** or higher for ES2015 and async function support.

```
npm install lim-mailer
```

## [Test](https://github.com/lim-kim930/lim-mailer/tree/main/test)

#### This is a simple function released with the npm package, with a small amount of code.

#### If you are using LimMailer for the first time, you can skip reading it and go to the [examples](https://github.com/lim-kim930/lim-mailer#examples), I believe they will help you get started faster.

#### Please Note:

- When you have usage problems in development, using test can help you troubleshoot the package itself.

- Before you `npm run test`, please configure the email address and other information to be used in the test in `test/config.json`.

#### For more information on configurable items, please check the [documentation](https://github.com/lim-kim930/lim-mailer#documentation).

```javascript
// test/config.json
{
    "outbox": {
        "host": "smtp.gmail.com",
        "port": 465,
        "secure": true,
        "auth": {
            "user": "",
            "pass": ""
        },
        "alias": "LimMailer"
    },

    "inbox": {
        "to": []
    },

    "content": {
        "subject": "A Test",
        "html": "<h1>This is a test email for <a href='https://github.com/lim-kim930/lim-emailer'>LimMailer</a></h1>"
    }
}
```

#### Then you can use the npm command to run the tests

- ##### For Commonjs

```
npm run test
```

- ##### For Typescript

```
npm run test-ts
```

## [Examples](https://github.com/lim-kim930/lim-mailer/tree/main/example)

#### This is a complete example to send an email with plain text and HTML body.

- ##### Commonjs

```javascript
// app.js
"use strict";
const LimMailer = require("lim-mailer");

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
});

mailer.setInbox({
    to: [], // list of receivers
    cc: []
});
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
```

- ##### Typescript
  
  ###### In ts, usually you only need to change the way dependencies are introduced, and you can use syntax such as async/await.

```javascript
import LimMailer from "lim-mailer";

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
});

mailer.setInbox({
    to: [], // list of receivers
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
```

## Documentation
