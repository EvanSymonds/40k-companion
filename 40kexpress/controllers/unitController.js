const mongoose = require('mongoose');
const unitCDebug = require('debug')('app:unitCDebug');

const unitSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  points: Number,
  detachId: mongoose.Schema.Types.Mixed
});

const Unit = mongoose.model('unit', unitSchema);


function connect(){
  mongoose.connect('mongodb://localhost/40k-companion')
    .then(() => unitCDebug('Connected to database'))
    .catch(err => unitCDebug('Could not connect to database'));
}

async function getAll(detachId){
  let units = await Unit.find({detachId: detachId});
  return units;
}

async function addUnit(name, quantity, points, detachId){
  let unit = new Unit({
    name: name,
    quantity: quantity,
    points,
    detachId: detachId
  }); 
  return await unit.save();
}

function updateUnit(id, data){
  return new Promise((resolve, reject) => {
    let unit = Unit.findByIdAndUpdate(id, 
      {name: data.name, quantity: data.quantity, points: data.points});
      unitCDebug(unit);
    resolve(unit);
  });
}

function deleteUnit(id, detachId){
  return new Promise((resolve, reject) => {
    let unit = Unit.deleteOne({"_id": id, detachId: detachId});
    resolve(unit);
  })
}

module.exports.deleteUnit = deleteUnit;
module.exports.addUnit = addUnit;
module.exports.updateUnit = updateUnit;
module.exports.connect = connect;
module.exports.getAll = getAll;