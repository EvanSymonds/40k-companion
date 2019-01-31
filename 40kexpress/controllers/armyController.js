const mongoose = require('mongoose');
const armyCDebug = require('debug')('app:armyCDebug');

const armySchema = new mongoose.Schema({
  name: String,
  userId: mongoose.Schema.Types.Mixed
});

const Army = mongoose.model('army', armySchema);


function connect(){
  mongoose.connect('mongodb://localhost/40k-companion')
    .then(() => armyCDebug('Connected to database'))
    .catch(err => armyCDebug('Could not connect to database'));
}



async function addArmy(name, userId){
  let army = new Army({
    name: name,
    userId: userId
  }); 
  const result = await army.save();
}


module.exports.addArmy = addArmy;
module.exports.connect = connect;