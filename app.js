const express = require("express");

const app = express();

require("./configs/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

app.set("view engine", "ejs");

const Usermodel = require("./models/db.model");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());

app.get("/", function (req, res) {
  res.render("form");
});

app.post("/userdata", function (req, res) {
  let { email, password } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const createdUser = await Usermodel.create({
        email: email,
        password: hash,
      });
    });
  });
  const token = jwt.sign({ email }, "screte");
  res.cookie("token", token);
  console.log(token);
  res.send("set cookie");
});

app.get("/k", function (req, res) {
  const data = jwt.verify(req.cookies.token, "screte");
  console.log(data);
  res.send(data)
});

app.listen(3000);
