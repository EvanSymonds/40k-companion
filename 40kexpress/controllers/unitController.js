const mongoose = require('mongoose');
const unitCDebug = require('debug')('app:unitCDebug');

const unitSchema = new mongoose.Schema({
  name: String,
  detachId: mongoose.Schema.Types.Mixed
});

const Unit = mongoose.model('unit', unitSchema);


function connect(){
  mongoose.connect('mongodb://localhost/40k-companion')
    .then(() => unitCDebug('Connected to database'))
    .catch(err => unitCDebug('Could not connect to database'));
}


async function addUnit(name, detachId){
  let unit = new Unit({
    name: name,
    detachId: detachId
  }); 
  const result = await unit.save();
}


module.exports.addUnit = addUnit;
module.exports.connect = connect;