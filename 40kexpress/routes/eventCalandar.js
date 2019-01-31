const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.send('Event calandar page');
})

module.exports = router;