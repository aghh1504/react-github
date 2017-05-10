var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var fetch = require("node-fetch");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/githubusers");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connect mongoose");
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    limit: '10mb'
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use('/notes', require('./routers/notes'));
app.use('/users', require('./routers/users'));


app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
