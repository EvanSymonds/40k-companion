const mongoose = require('mongoose');
const joinTDebug = require('debug')('app:joinTDebug');

const userArmySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.Mixed,
  armyId: mongoose.Schema.Types.Mixed
});

const UserArmy = mongoose.model('user-army', userArmySchema);


function connect(){
  mongoose.connect('mongodb://localhost/40k-companion')
    .then(() => joinTDebug('Connected to database'))
    .catch(err => joinTDebug('Could not connect to database'));
}

async function addUserArmy(userId, armyId){
  const userArmy = new UserArmy({
    userId: userId,
    armyId: armyId
  });
  const result = await userArmy.save();
}
module.exports.connect = connect;
module.exports.addUserArmy = addUserArmy;