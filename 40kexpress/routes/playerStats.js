const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.send('Player stats page');
})

module.exports = router;