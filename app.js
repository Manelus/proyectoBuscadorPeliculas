var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
//Inport Routing
var movieRouter = require("./routes/movies");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/usuarios");
var pedidoRouter = require("./routes/pedidos");

require('dotenv').config();

console.log(process.env.PORT)

connect();

var app = express();
const PORT = process.env.PORT || 4000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//Load Routing 
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/movies", movieRouter);
app.use("/pedidos", pedidoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render("error");
  res.json({error: "error"});
});

function listen() {
  PORT, () => { console.log(`App corriendo en el puerto: ${PORT}`)}
}

function connect() {
  try {
    mongoose.connection
      .on("error", console.log)
      .on("disconnected", connect)
      .once("open", listen);
    var connection = require('./config/mongoose');
    return connection;
  } catch (e) {
    console.log(e.message);
  }
}


module.exports = app;
