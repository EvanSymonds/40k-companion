const express = require('express');
const router = express.Router();
const debug = require('debug')('app:debug');
const detachController = require('../controllers/detachmentController');

router.use(express.json());

router.get('/', (req,res) => {
  let detachs = getAllDetachs();
  detachs.then((detachs) => {
    res.send({data: detachs});
  });
})

function getAllDetachs(){
  return new Promise((resolve, reject) => {
    let detachs = detachController.getAll()
    resolve(detachs);
  });
}

router.put('/', (req, res) => {
  let data = req.body.params.data;
  let id = req.body.params.id;
  debug(req.body);
  let detachs = detachController.updateDetach(id, data);
  detachs.then((detachs) => {
    debug(detachs);
  })
})

router.post('/', (req, res) => {
  let name = req.body.name;
  let type = req.body.type;
  let id = detachController.addDetach(name, type, 1);
  id.then((id) => {
    debug(id);
    res.send(id);
  })
})

module.exports = router;