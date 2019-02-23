const mongoose = require('mongoose');
const detachCDebug = require('debug')('app:detachCDebug');

const detachSchema = new mongoose.Schema({
  name: String,
  type: String,
  userId: mongoose.Schema.Types.Mixed
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
  return new Promise((resolve, reject) => {
    let detach = Detach.findByIdAndUpdate(id, 
      {name: data.name, type: data.type});
    resolve(detach);
  });
}

function deleteDetach(id){
  return new Promise((resolve, reject) => {
    let detach = Detach.deleteOne({"_id": id});
    resolve(detach);
  })
}

async function addDetach(name, type, userId){
  let detach = new Detach({
    name: name,
    type: type,
    userId: userId
  }); 
  let result = await detach.save();
  return(result._id);
}


module.exports.addDetach = addDetach;
module.exports.updateDetach = updateDetach;
module.exports.deleteDetach = deleteDetach;
module.exports.getAll = getAll;
module.exports.connect = connect;