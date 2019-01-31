const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.send('Campaign manager page');
})

module.exports = router;