const express = require('express');
const router = express.Router();
const debug = require('debug')('app:debug');
const userController = require('../controllers/userController');
const Joi = require('joi');

router.use(express.json());

router.post('/', (req, res) => {
  const schema = {
    name: Joi.string().min(3).max(20).required(),
    pass: Joi.string().min(5).max(1024).required()
  }
  let {error} = Joi.validate(req.body, schema);
  if ( error ) return res.status(400).send(error.details[0].message);

  let output = userController.newUser(req.body)
  output.then((output) => {
      if (output === false){
        res.status(400).send('Username taken');
      }
    
      debug(output);
    
      res.send(output);
    });
})

module.exports = router;