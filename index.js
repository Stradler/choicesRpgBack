var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var dotenv = require('dotenv');
dotenv.load();
var {sequelize, Survival} = require("./models");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {

});

app.listen(process.env.PORT, () => console.log(process.env.PORT));