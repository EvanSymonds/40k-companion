const express = require('express');
const router = express.Router();
const debug = require('debug')('app:debug');
const detachController = require('../controllers/detachmentController');
const unitController = require('../controllers/unitController');

router.use(express.json());

//Detach requests
router.get('/detach', (req,res) => {
  let detachs = new Promise((resolve, reject) => {
    let detachs = detachController.getAll()
    resolve(detachs);
  });
  detachs.then((detachs) => {
    res.send({data: detachs});
  });
})
router.put('/detach', (req, res) => {
  let data = req.body.params.data;
  let id = req.body.params.id;
  debug(req.body);
  let detachs = detachController.updateDetach(id, data);
  detachs.then((detachs) => {
    debug(detachs);
    res.send(detachs);
  })
})
router.post('/detach', (req, res) => {
  let name = req.body.name;
  let type = req.body.type;
  let userId = req.body.userId

  let id = detachController.addDetach(name, type, userId);
  id.then((id) => {
    debug(id);
    res.send(id);
  })
})
router.delete('/detach', (req, res) => {
  debug(req.body.id);
  let id = req.body.id;
  
  let detach = detachController.deleteDetach(id);
  detach.then((detach) => {
    res.send(detach);
  })
})

//Unit requests
router.get('/unit', (req,res) => {
  let units = new Promise((resolve, reject) => {
    let units = unitController.getAll(req.query.detachId);
    resolve(units);
  });
  units.then((units) => {
    res.send(units);
  });
})
router.post('/unit', (req, res) => {
  debug('request recieved');
  let name = req.body.name;
  let quantity = req.body.quantity;
  let points = req.body.points;
  let detachId = req.body.detachId;
  let id = unitController.addUnit(name, quantity, points, detachId);
  id.then((id) => {
    debug(id);
    res.send(id);
  })
})
router.delete('/unit', (req, res) => {
  debug(req.body);
  let id = req.body.id;
  let detachId = req.body.detachId;

  if (req.body.deleteAll === true){
    unitController.deleteAllUnits(detachId);
  }

  debug(id, detachId);
  let unit = unitController.deleteUnit(id, detachId);
  unit.then((unit) => {
    res.send(unit);
  })
})
router.put('/unit', (req, res) => {
  let data = req.body.params.data;
  let id = req.body.params.id;
  debug(req.body.params);
  let units = unitController.updateUnit(id, data);
  units.then((units) => {
    debug(units);
    res.send(units);
  })
})

module.exports = router;