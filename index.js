const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const helmet = require("helmet");
const eventRoutes = require("./routes/events");


dotenv.load();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render("index");
});

app.use('/api/', eventRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {status:err.status, message:err.message});
});

app.listen(process.env.PORT, () => console.log(process.env.PORT));