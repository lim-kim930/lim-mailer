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
        // Google Mail requires two-step verification：https://myaccount.google.com/security
        // Then create an application-specific password and fill in the pass filed：https://myaccount.google.com/apppasswords
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

const mailer = new LimMailer(config.outbox);

mailer.setInbox(config.inbox);
mailer.sendMail(config.content).then(() => {
    console.log("\x1B[2m" + new Date().toLocaleString() + "\x1B[0m \x1B[32msuccess!\x1B[0m");
}).catch((err) => {
    console.log("\x1B[2m" + new Date().toLocaleString() + "\x1B[0m \x1B[31merror: \x1B[0m" + err);
}) 
```

- ##### Typescript

```javascript
import LimMailer from "lim-mailer";

const mailer = new LimMailer(config.outbox);
mailer.setInbox(config.inbox);
mailer.sendMail(config.content).then((info) => {
    console.log("\x1B[2m" + new Date().toLocaleString() + "\x1B[0m \x1B[32msuccess!\x1B[0m");
}).catch((err: Error) => {
    console.log("\x1B[2m" + new Date().toLocaleString() + "\x1B[0m \x1B[31merror: \x1B[0m" + err);
})
```

## Documentation
