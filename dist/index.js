"use strict";
/**
 * MIT License
 * Copyright (c) 2022 lim-kim930
 */
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const emailAddressValidator = (address) => {
    if (!address)
        return false;
    if (typeof address === "object") {
        for (let item of address) {
            if (!emailAddressValidator(item)) {
                return false;
            }
        }
        return true;
    }
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(address);
};
class LimMailer {
    constructor(outbox, inbox) {
        if (outbox) {
            this.transporter = (0, nodemailer_1.createTransport)(outbox);
            this.setOutbox(outbox);
        }
        if (inbox) {
            this.setInbox(inbox);
        }
    }
    setOutbox(outbox) {
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
    }
    setInbox(inbox) {
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
    }
    sendMail(mailContent) {
        if (!mailContent)
            throw new Error("Missing required parameters");
        return new Promise((resolve, reject) => {
            var _a, _b;
            if (!this.transporter)
                throw new Error("Need to set outbox before calling sendMail");
            if (mailContent.to) {
                if (!emailAddressValidator(mailContent.to)) {
                    throw new Error("Invalid email address in parameters 'to', please check");
                }
            }
            else {
                if (!this.inbox) {
                    throw new Error("Need to set inbox before calling sendMail");
                }
                else {
                    mailContent.to = this.inbox.to;
                    mailContent.cc = this.inbox.cc;
                }
            }
            const mailOptions = Object.assign({}, mailContent);
            if ((_a = this.outbox) === null || _a === void 0 ? void 0 : _a.alias) {
                mailOptions.from = {
                    name: (_b = this.outbox) === null || _b === void 0 ? void 0 : _b.alias,
                    address: this.outbox.auth.user
                };
            }
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error)
                    reject(error);
                else
                    resolve(info);
                this.transporter.close();
            });
        });
    }
    get outboxAddress() {
        var _a, _b;
        return (_b = (_a = this.outbox) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.user;
    }
    get inboxAddress() {
        var _a;
        return (_a = this.inbox) === null || _a === void 0 ? void 0 : _a.to;
    }
}
exports.default = LimMailer;
