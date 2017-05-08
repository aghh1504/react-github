var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var fetch = require("node-fetch");

const GITHUB_TOKEN = '3d77aaa0aee4a5b2bdfe6b800c7bdaf2ca2c42fc';
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/githubusers");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    limit: '10mb'
}));

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
  login: String,
  info: {
    payload: {
      type: String,
      get: function(data) {
        try {
          return JSON.parse(data)
        } catch (e) {
          return data;
        }
      },
      set: function(data) {
        return JSON.stringify(data);
      }
    },
    requestDate: Number
  },
  notes: {
    payload: {
      type: String,
      get: function(data) {
        try {
          return JSON.parse(data)
        } catch (e) {
          return data;
        }
      },
      set: function(data) {
        return JSON.stringify(data);
      }
    },
    requestDate: Number
  },
  repos: {
    payload: {
      type: String,
      get: function(data) {
        try {
          return JSON.parse(data)
        } catch (e) {
          return data;
        }
      },
      set: function(data) {
        return JSON.stringify(data);
      }
    },
    requestDate: Number
  },
  requestDate: Number
});

app.use(bodyParser.urlencoded({ extended: true }));

// GET FROM DATABASE

const getUser = function(username) {
  return User.find({
    login: username
  })
  .then((results) => {
    if(results.length < 1) {
      throw new Error('user not found');
    } else {
      console.log('user from db');
      return results[0];
    }
  })
  .catch((error) => {
    console.log('created new user');
    return new User({
      login: username
    });
  });
}


const TYPES = {
  info: '',
  repos: '/repos'
}
const getInfo = function (user, type) {
  if(user[type] && (Date.now() - user[type].requestDate > 3600)) {
    console.log('retrieved from db user ' + type);
    return Promise.resolve(user[type].payload);
  } else {
    console.log('added user ' + type);
    return fetch(`https://api.github.com/users/${user.login}` + TYPES[type] + `?access_token=${GITHUB_TOKEN}`)
      .then((data) => data.json())
      .then((data) => {
        //store data in db
        user[type] = {};
        user[type].payload = data;
        user[type].requestDate = Date.now();
        return user.save()
          .then(() => data)
      })
  }

  //here we always return user.info.payload
}



app.get("/users/:username", function(req, res) {
  console.log(req.params.username)

  return getUser(req.params.username)
    .then((user) => Promise.all([
      getInfo(user, 'info'),
      getInfo(user, 'repos')
    ]))
  .then(([info, repos]) => {
    res.send({
      info,
      repos
    });
  })
  .catch((error) => console.error(error))

});



app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
