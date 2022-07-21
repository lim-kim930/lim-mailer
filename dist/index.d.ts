/**
 * MIT License
 * Copyright (c) 2022 lim-kim930
 */
import { Options, AuthenticationType } from "nodemailer/lib/smtp-connection";
import { Options as MailOptions } from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
interface Outbox extends Options {
    alias?: string;
    auth: AuthenticationType;
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
declare class LimMailer {
    private outbox;
    private transporter;
    private inbox;
    constructor(outbox?: Outbox, inbox?: Inbox);
    setOutbox(outbox: Outbox): void;
    setInbox(inbox: Inbox): Inbox | undefined;
    sendMail(mailContent: MailContent): Promise<Error | SMTPTransport.SentMessageInfo>;
    get outboxAddress(): string | undefined;
    get inboxAddress(): string | string[] | undefined;
}
export = LimMailer;
