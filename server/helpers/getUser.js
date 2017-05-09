var mongoose = require("mongoose");

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
  notes: [String]
});

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

module.exports = getUser;
