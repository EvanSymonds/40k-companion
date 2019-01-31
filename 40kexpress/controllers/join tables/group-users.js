const mongoose = require('mongoose');
const joinTDebug = require('debug')('app:joinTDebug');

const groupUserSchema = new mongoose.Schema({
  groupId: mongoose.Schema.Types.Mixed,
  userId: mongoose.Schema.Types.Mixed
});

const GroupUser = mongoose.model('group-user', groupUserSchema);


function connect(){
  mongoose.connect('mongodb://localhost/40k-companion')
    .then(() => joinTDebug('Connected to database'))
    .catch(err => joinTDebug('Could not connect to database'));
}

async function addGroupUser(groupId, userId){
  const groupUser = new GroupUser({
    groupId: groupId,
    userId: userId
  });
  const result = await groupUser.save();
}
module.exports.connect = connect;
module.exports.addGroupUser = addGroupUser;