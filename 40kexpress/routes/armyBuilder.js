const express = require('express');
const router = express.Router();
const debug = require('debug')('app:debug');

router.get('/', (req,res) => {
  res.send('Army builder page');
})

router.put('/', (req,res) => {
  debug('Connected');
})

module.exports = router;