var fetch = require("node-fetch");
const GITHUB_TOKEN = '3d77aaa0aee4a5b2bdfe6b800c7bdaf2ca2c42fc';

const TYPES = {
  info: '',
  repos: '/repos'
}
const getInfo = function (user, type, force = false) {
  if(!force && user[type] && (Date.now() - user[type].requestDate > 3600)) {
    console.log('retrieved from db user ' + type);
    return Promise.resolve(user[type].payload);
  } else {
    console.log('added user ' + type);
    return fetch(`https://api.github.com/users/${user.login}` + TYPES[type] )
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
}

module.exports = getInfo;
