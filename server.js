var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/githubusers");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
console.log("connect mongoose");
});
//Schema
var User = mongoose.model("User", {
  Username: Array,
  repos: Array,
  notes: Array
});

app.use(bodyParser.urlencoded({ extended: true }));

// GET FROM DATABASE
app.get("/users", function(req, res) {
  User.find({}, function(err, results) {
    console.log(`get useres ${JSON.stringify(results)}`)
    if (err)
       res.send(err);
    res.status(200).json(results);
  });
});

//ADD NEW
app.post("/new", function(req, res) {
  console.log(`new user ${JSON.stringify(req.body)}`)
  db.collection("users").insert(req.body, function(err, results) {
    console.log("new results", results);
    if (err)
       res.send(err);
    res.status(200).json(results);
  });
});

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
