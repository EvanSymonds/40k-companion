const express = require('express');
const router = express.Router();
const debug = require('debug')('app:debug');
const userController = require('../controllers/userController');
const Joi = require('joi');

router.use(express.json());

router.post('/signup', (req, res) => {

  debug(req.body);

  if (!req.body.username) return res.send('Username required');
  if (!req.body.password) return res.send('Password required');

  const schema = {
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(5).max(1024).required()
  }
  let {error} = Joi.validate(req.body, schema);
  if ( error ){
    res.send(error.details[0].message);
    res.status(400);
  }

  let output = userController.newUser(req.body)
  output.then((output) => {
      if (output === false){
        res.send('Username taken');
      }
      debug(output);
      res.send(output);
    });
})

router.post('/', (req, res) => {
  debug(req.body.password);

  if (!req.body.username) return res.send('Username required');
  if (!req.body.password) return res.send('Password required');

  let user = userController.getOne(req.body.username);
  user.then((user) => {
    debug(user);
    if (user === null) return res.send('Invalid username');
    if (user.password != req.body.password) return res.send('Invalid password');

    if (user.password === req.body.password){
      res.send(user);
    }
  })
})

module.exports = router;