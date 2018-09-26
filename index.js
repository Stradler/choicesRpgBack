const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const dotenv = require('dotenv');
const helmet = require("helmet");
const cors = require("cors");
const eventRoutes = require("./routes/events");
const creatorsRoutes = require("./routes/creators");

dotenv.load();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(cors());
app.use(helmet())
// app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", creatorsRoutes);
app.use('/api/', eventRoutes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {status:err.status, message:err.message});
});

app.listen(process.env.PORT, () => console.log(process.env.PORT));