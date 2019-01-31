const mongoose = require('mongoose');
const groupCDebug = require('debug')('app:groupCDebug');

const groupSchema = new mongoose.Schema({
  name: String,
});

const Group = mongoose.model('group', groupSchema);


function connect(){
  mongoose.connect('mongodb://localhost/40k-companion')
    .then(() => groupCDebug('Connected to database'))
    .catch(err => groupCDebug('Could not connect to database'));
}


async function addGroup(name){
  let group = new Group({
    name: name,
  }); 
  const result = await group.save();
}


module.exports.addGroup = addGroup;
module.exports.connect = connect;