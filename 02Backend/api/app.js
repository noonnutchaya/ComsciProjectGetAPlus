var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var checkRouter = require("./routes/index");
var fourPageRouter = require("./routes/cal4Page");
var a4Router = require("./routes/calA4");
var cardRouter = require("./routes/calCard");
var envelopRouter = require("./routes/calEnvelope");
var flyerRouter = require("./routes/calFlyer");
var posterRouter = require("./routes/calPoster");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", checkRouter);

app.use("/cal4Page", fourPageRouter);
app.use("/calA4", a4Router);
app.use("/calCard", cardRouter);
app.use("/calEnvelope", envelopRouter);
app.use("/calFlyer", flyerRouter);
app.use("/calPoster", posterRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
