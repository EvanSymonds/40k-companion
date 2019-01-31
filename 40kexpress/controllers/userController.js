const mongoose = require('mongoose');
const userCDebug = require('debug')('app:userCDebug');

const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model('user', userSchema);


function connect(){
  mongoose.connect('mongodb://localhost/40k-companion')
    .then(() => userCDebug('Connected to database'))
    .catch(err => userCDebug('Could not connect to database'));
}


async function addUser(name){
  let user = new User({
    name: name,
  }); 
  const result = await user.save();
}


module.exports.addUser = addUser;
module.exports.connect = connect;