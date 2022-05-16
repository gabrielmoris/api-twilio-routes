const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./api/routes/twilio-routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

app.listen(3000, () => console.log("app listenning in 3000"));
