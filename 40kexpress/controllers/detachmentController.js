const mongoose = require('mongoose');
const detachCDebug = require('debug')('app:detachCDebug');

const detachSchema = new mongoose.Schema({
  name: String,
  type: String,
  armyId: mongoose.Schema.Types.Mixed
});

const Detach = mongoose.model('detachment', detachSchema);


function connect(){
  mongoose.connect('mongodb://localhost/40k-companion')
    .then(() => detachCDebug('Connected to database'))
    .catch(err => detachCDebug('Could not connect to database'));
}

async function getAll(){
  let detachs = await Detach.find();
  return detachs;
}

function updateDetach(id, data){
  detachCDebug(id);
  return new Promise((resolve, reject) => {
    let detach = Detach.findByIdAndUpdate(id, 
      {name: data.name, type: data.type});
    resolve(detach);
  });
}

async function addDetach(name, type, armyId){
  let detach = new Detach({
    name: name,
    type: type,
    armyId: armyId
  }); 
  const result = await detach.save();
}


module.exports.addDetach = addDetach;
module.exports.updateDetach = updateDetach;
module.exports.getAll = getAll;
module.exports.connect = connect;