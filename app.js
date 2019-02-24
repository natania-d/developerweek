var express = require("express");
const path = require('path')
const PORT = process.env.PORT || 5000;
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

var server = app.listen(PORT, function () {
    console.log("Listening on port ${ PORT }...", server.address().port);
});