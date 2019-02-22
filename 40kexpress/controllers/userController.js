const mongoose = require('mongoose');
const userCDebug = require('debug')('app:userCDebug');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  pass: {
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

async function getOne(name){
  let user = await User.findOne({name: name})
  return user;
}

async function newUser(login){
  let user = await User.findOne(login);
  if ( user ) return false;

  user = new User({
    name: login.name,
    pass: login.pass
  })

  user = new Promise((resolve, reject) => {
    resolve(user.save());
  })
}

module.exports.getOne = getOne;
module.exports.getAll = getAll;
module.exports.newUser = newUser;
module.exports.connect = connect;