module.exports = function (app) {
    const twilioFunc = require("../twilio_funcs/twilio-functs");
    app.route("/sms").get(twilioFunc.getSms).post(twilioFunc.sendSms);

    app.route("/whatsapps")
        .get(twilioFunc.getWhatsapp)
        .post(twilioFunc.sendWhatsapp);
};
