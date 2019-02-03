const express = require('express');
const router = express.Router();
const debug = require('debug')('app:debug');
const detachController = require('../controllers/detachmentController');

router.use(express.json());

router.get('/', (req,res) => {
  const detachs = getAllDetachs();
  detachs.then((detachs) => {
    debug({data: detachs});
    res.send({data: detachs});
  });
})

function getAllDetachs(){
  return new Promise((resolve, reject) => {
    let detachs = detachController.getAll()
    resolve(detachs);
  });
}

router.post('/', (req) => {
  let name = req.body.name;
  let type = req.body.type;
  detachController.addDetach(name, type, 1);
})

module.exports = router;