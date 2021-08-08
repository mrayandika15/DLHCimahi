var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// import flash
const flash = require("connect-flash");
// import session
const session = require("express-session");
// mengimport mongoose
const mongoose = require("mongoose");
// import method override
const methodOverride = require("method-override");
/**
 * mengubungkan ke database
 * mongoose.connect sebuah metode yang berfungsi untuk mengubungkan ke MongoDB
 * db_dlhcimahi sebagai nama dari database yang akan dibuat, penamaan ini bebas, sesuai selera
 * 27017 adalah lokal port default
 * jika menggunakan angka 27017 gagal bisa menggunakan 127.0.0.1
 * penjelasan ini saya dapatkan dari dokumentasi resminya
 */
mongoose.connect("mongodb://localhost:27017/db_dlhcimahi", {
  // untuk pengertian fungsi dibawah ini di dokumentasi resminya sangat dijelaskan, jangan lupa dibaca.
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// mengambil fungsi yang route kecamatan
const kecamatanRouter = require("./routes/kecamatan");
const sungaiRouter = require("./routes/sungai")

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// menggunakan method-override
app.use(methodOverride("_method"));
// menggunakan session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
// menggunakan flash
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// menggunakan routes kecamatan
app.use("/kecamatan", kecamatanRouter);

app.use("/sungai", sungaiRouter);

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
  res.render("error");
});

module.exports = app;