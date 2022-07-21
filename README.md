# lim-emailer

##### A simple package mailer based on nodemailer.

###### More intuitive and convenient.



#### Installation

LimMailer requires **Node.js v6.0.0** or higher for ES2015 and async function support.

```
npm install lim-mailer
```

#### [Test](https://github.com/lim-kim930/lim-mailer/tree/main/test)

This is a complete example to send an email with plain text.

```javascript
"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
```



#### [Example](https://github.com/lim-kim930/lim-mailer/tree/main/example)

This is a complete example to send an email with plain text.

```javascript
"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
```

## Typescript

```js
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
```

### [](https://www.npmjs.com/package/koa#common-function)

```js
// Middleware normally takes two parameters (ctx, next), ctx is the context for one request,
// next is a function that is invoked to execute the downstream middleware. It returns a Promise with a then function for running code after completion.

app.use((ctx, next) => {
  const start = Date.now();
  return next().then(() => {
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
});
```

### [](https://www.npmjs.com/package/koa#koa-v1x-middleware-signature)Koa v1.x Middleware Signature

The middleware signature changed between v1.x and v2.x. The older signature is deprecated.

**Old signature middleware support will be removed in v3**

Please see the [Migration Guide](https://github.com/koajs/koa/blob/HEAD/docs/migration.md) for more information on upgrading from v1.x and using v1.x middleware with v2.x.

## [](https://www.npmjs.com/package/koa#context-request-and-response)Context, Request and Response

Each middleware receives a Koa `Context` object that encapsulates an incoming http message and the corresponding response to that message. `ctx` is often used as the parameter name for the context object.

```js
app.use(async (ctx, next) => { await next(); });
```

Koa provides a `Request` object as the `request` property of the `Context`.  
Koa's `Request` object provides helpful methods for working with http requests which delegate to an [IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) from the node `http` module.

Here is an example of checking that a requesting client supports xml.

```js
app.use(async (ctx, next) => {
  ctx.assert(ctx.request.accepts('xml'), 406);
  // equivalent to:
  // if (!ctx.request.accepts('xml')) ctx.throw(406);
  await next();
});
```

Koa provides a `Response` object as the `response` property of the `Context`.  
Koa's `Response` object provides helpful methods for working with http responses which delegate to a [ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse) .

Koa's pattern of delegating to Node's request and response objects rather than extending them provides a cleaner interface and reduces conflicts between different middleware and with Node itself as well as providing better support for stream handling. The `IncomingMessage` can still be directly accessed as the `req` property on the `Context` and `ServerResponse` can be directly accessed as the `res` property on the `Context`.

Here is an example using Koa's `Response` object to stream a file as the response body.

```js
app.use(async (ctx, next) => {
  await next();
  ctx.response.type = 'xml';
  ctx.response.body = fs.createReadStream('really_large.xml');
});
```

The `Context` object also provides shortcuts for methods on its `request` and `response`. In the prior examples, `ctx.type` can be used instead of `ctx.response.type` and `ctx.accepts` can be used instead of `ctx.request.accepts`.

For more information on `Request`, `Response` and `Context`, see the [Request API Reference](https://github.com/koajs/koa/blob/HEAD/docs/api/request.md), [Response API Reference](https://github.com/koajs/koa/blob/HEAD/docs/api/response.md) and [Context API Reference](https://github.com/koajs/koa/blob/HEAD/docs/api/context.md).

## [](https://www.npmjs.com/package/koa#koa-application)Koa Application

The object created when executing `new Koa()` is known as the Koa application object.

The application object is Koa's interface with node's http server and handles the registration of middleware, dispatching to the middleware from http, default error handling, as well as configuration of the context, request and response objects.

Learn more about the application object in the [Application API Reference](https://github.com/koajs/koa/blob/HEAD/docs/api/index.md).
