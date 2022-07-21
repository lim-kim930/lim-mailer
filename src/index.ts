/**
 * MIT License
 * Copyright (c) 2022 lim-kim930
 */

import { createTransport, Transporter } from "nodemailer";
import { Options, AuthenticationType } from "nodemailer/lib/smtp-connection";
import { Options as MailOptions } from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface Outbox extends Options {
    alias?: string;
    auth: AuthenticationType
}

interface Inbox {
    to: string | Array<string>;
    cc?: string | Array<string>;
}

interface MailContent {
    subject?: MailOptions["subject"];
    html?: MailOptions["html"];
    text?: MailOptions["text"];
    to?: Inbox["to"];
    cc?: Inbox["cc"];
}

const emailAddressValidator = (address: string | string[] | undefined) => {
    if (!address) return false;
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
    private outbox: Outbox | undefined;
    private transporter: Transporter | undefined;
    private inbox: Inbox | undefined;

    constructor(outbox?: Outbox, inbox?: Inbox) {
        if (outbox) {
            this.transporter = createTransport(outbox);
            this.setOutbox(outbox);
        }
        if (inbox) {
            this.setInbox(inbox);
        }
    }

    setOutbox(outbox: Outbox) {
        if (!outbox) throw new Error("Missing required parameters");
        if (!outbox.auth) throw new Error("Missing required parameters: auth");
        if (emailAddressValidator(outbox.auth.user)) {
            this.outbox = outbox;
            this.transporter = createTransport(outbox);
        } else {
            throw new Error("Invalid email address on filed 'auth.user', please check");
        }
    }

    setInbox(inbox: Inbox) {
        if (!inbox) throw new Error("Missing required parameters");
        if (emailAddressValidator(inbox.to)) {
            if (!inbox.cc) return this.inbox = inbox;

            if (emailAddressValidator(inbox.cc)) {
                this.inbox = inbox;
            } else {
                throw new Error("Invalid email address in parameters 'cc', please check");
            }
        } else {
            throw new Error("Invalid email address in parameters 'to', please check");
        }
    }

    sendMail(mailContent: MailContent): Promise<Error | SMTPTransport.SentMessageInfo> {
        if (!mailContent) throw new Error("Missing required parameters");
        return new Promise((resolve, reject) => {
            if (!this.transporter) throw new Error("Need to set outbox before calling sendMail");
            if (mailContent.to) {
                if (!emailAddressValidator(mailContent.to)) {
                    throw new Error("Invalid email address in parameters 'to', please check");
                }
            } else {
                if (!this.inbox) {
                    throw new Error("Need to set inbox before calling sendMail");
                } else {
                    mailContent.to = this.inbox.to;
                    mailContent.cc = this.inbox.cc;
                }
            }
            const mailOptions: MailOptions = { ...mailContent };
            if (this.outbox?.alias) {
                mailOptions.from = {
                    name: this.outbox?.alias,
                    address: this.outbox.auth.user!
                }
            }
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) reject(error);
                else resolve(info);
                this.transporter!.close();
            });
        })
    }

    get outboxAddress() {
        return this.outbox?.auth?.user;
    }

    get inboxAddress() {
        return this.inbox?.to;
    }

}

export = LimMailer;