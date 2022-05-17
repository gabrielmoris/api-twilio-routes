const dotenv = require("dotenv").config();
const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

exports.getSms = (req, res) => {
    try {
        client.messages
            .list({ limit: 20 })
            .then((messages) => {
                let allMessages = [];
                messages.forEach((m) => {
                    if (m.from.substring(0, 9) !== "whatsapp:") {
                        allMessages.push({
                            from: m.from,
                            to: m.to,
                            body: m.body,
                        });
                    }
                });
                return allMessages;
            })
            .then((allMessages) => res.json(allMessages))
            .catch((error) => {
                res.json(error);
            });
    } catch {
        res.json("Error fetching SMS");
    }
};

exports.sendSms = (req, res) => {
    const sender = process.env.TWILIO_PHONE_NUMBER;
    const recipient = req.body.to;
    const message = req.body.message;

    try {
        if (recipient && message) {
            client.messages
                .create({
                    body: message,
                    from: sender,
                    to: recipient,
                })
                .then((message) =>
                    res.json({ action: `Send SMS`, response: message })
                )
                .catch((error) => {
                    res.json(error).status(400);
                });
        } else {
            res.status(400);
            throw error;
        }
    } catch {
        res.json(
            "Error: Insert keys 'to' (telefone number) and 'message' (your message)"
        ).status(400);
    }
};

exports.getWhatsapp = (req, res) => {
    try {
        client.messages
            .list({ limit: 20 })
            .then((messages) => {
                let allMessages = [];
                messages.forEach((m) => {
                    if (m.from.substring(0, 9) === "whatsapp:") {
                        allMessages.push({
                            from: m.from,
                            to: m.to,
                            body: m.body,
                        });
                    }
                });
                return allMessages;
            })
            .then((allMessages) => res.json(allMessages))
            .catch((error) => {
                res.json(error);
            });
    } catch {
        res.json("Error fetching Whatsapps");
    }
};

exports.sendWhatsapp = (req, res) => {
    const sender = `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`;
    const recipient = `whatsapp:${req.body.to}`;
    const message = req.body.message;
    console.log(sender, recipient, message);

    try {
        if (recipient && message) {
            client.messages
                .create({
                    from: sender,
                    body: message,
                    to: recipient,
                })
                .then((message) =>
                    res.json({ action: `Send whatsapp`, response: message.sid })
                )
                .catch((error) => {
                    res.json(error).status(400);
                });
        } else {
            res.status(400);
            throw error;
        }
    } catch {
        res.json(
            "Error: Insert keys 'to' (telefone number) and 'message' (your message)"
        ).status(400);
    }
};
