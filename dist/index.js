"use strict";
/**
 * MIT License
 * Copyright (c) 2022 lim-kim930
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var nodemailer_1 = require("nodemailer");
var emailAddressValidator = function (address) {
    if (!address)
        return false;
    if (typeof address === "object") {
        for (var _i = 0, address_1 = address; _i < address_1.length; _i++) {
            var item = address_1[_i];
            if (!emailAddressValidator(item)) {
                return false;
            }
        }
        return true;
    }
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(address);
};
var LimMailer = /** @class */ (function () {
    function LimMailer(outbox, inbox) {
        if (outbox) {
            this.transporter = (0, nodemailer_1.createTransport)(outbox);
            this.setOutbox(outbox);
        }
        if (inbox) {
            this.setInbox(inbox);
        }
    }
    LimMailer.prototype.setOutbox = function (outbox) {
        if (!outbox)
            throw new Error("Missing required parameters");
        if (!outbox.auth)
            throw new Error("Missing required parameters: auth");
        if (emailAddressValidator(outbox.auth.user)) {
            this.outbox = outbox;
            this.transporter = (0, nodemailer_1.createTransport)(outbox);
        }
        else {
            throw new Error("Invalid email address on filed 'auth.user', please check");
        }
    };
    LimMailer.prototype.setInbox = function (inbox) {
        if (!inbox)
            throw new Error("Missing required parameters");
        if (emailAddressValidator(inbox.to)) {
            if (!inbox.cc)
                return this.inbox = inbox;
            if (emailAddressValidator(inbox.cc)) {
                this.inbox = inbox;
            }
            else {
                throw new Error("Invalid email address in parameters 'cc', please check");
            }
        }
        else {
            throw new Error("Invalid email address in parameters 'to', please check");
        }
    };
    LimMailer.prototype.sendMail = function (mailContent) {
        var _this = this;
        if (!mailContent)
            throw new Error("Missing required parameters");
        return new Promise(function (resolve, reject) {
            var _a, _b;
            if (!_this.transporter)
                throw new Error("Need to set outbox before calling sendMail");
            if (mailContent.to) {
                if (!emailAddressValidator(mailContent.to)) {
                    throw new Error("Invalid email address in parameters 'to', please check");
                }
            }
            else {
                if (!_this.inbox) {
                    throw new Error("Need to set inbox before calling sendMail");
                }
                else {
                    mailContent.to = _this.inbox.to;
                    mailContent.cc = _this.inbox.cc;
                }
            }
            var mailOptions = __assign({}, mailContent);
            if ((_a = _this.outbox) === null || _a === void 0 ? void 0 : _a.alias) {
                mailOptions.from = {
                    name: (_b = _this.outbox) === null || _b === void 0 ? void 0 : _b.alias,
                    address: _this.outbox.auth.user
                };
            }
            _this.transporter.sendMail(mailOptions, function (error, info) {
                if (error)
                    reject(error);
                else
                    resolve(info);
                _this.transporter.close();
            });
        });
    };
    Object.defineProperty(LimMailer.prototype, "outboxAddress", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this.outbox) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.user;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LimMailer.prototype, "inboxAddress", {
        get: function () {
            var _a;
            return (_a = this.inbox) === null || _a === void 0 ? void 0 : _a.to;
        },
        enumerable: false,
        configurable: true
    });
    return LimMailer;
}());
module.exports = LimMailer;
