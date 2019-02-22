const mongoose = require('mongoose');
const userCDebug = require('debug')('app:userCDebug');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

const User = mongoose.model('user', userSchema);

function connect(){
  mongoose.connect('mongodb://localhost/40k-companion')
    .then(() => userCDebug('Connected to database'))
    .catch(err => userCDebug('Could not connect to database'));
}

async function getAll(){
  let users = await User.find();
  return users;
}

async function getOne(username){
  let user = await User.findOne({username: username})
  return user;
}

async function newUser(login){

  let user = await User.findOne({username: login.username});
  userCDebug(user);
  if ( user ) {
    return false;
  } else {  
    user = new User({
      username: login.username,
      password: login.password
    })

    user = new Promise((resolve, reject) => {
      resolve(user.save());
    })
    return user;
  }
}

module.exports.getOne = getOne;
module.exports.getAll = getAll;
module.exports.newUser = newUser;
module.exports.connect = connect;