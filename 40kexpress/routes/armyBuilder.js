const express = require('express');
const router = express.Router();
const debug = require('debug')('app:debug');
const detachController = require('../controllers/detachmentController');

router.use(express.json());

router.get('/', (req,res) => {
  res.send('Army builder page');
})

router.post('/', (req) => {
  let name = req.body.name;
  let type = req.body.type;
  detachController.addDetach(name, type, 1);
})

module.exports = router;