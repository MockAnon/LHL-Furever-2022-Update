import express from 'express';
import bcrypt from 'bcrypt';

import UserSerializer from '../serializers/user';

const router = express.Router();
const SALT_ROUNDS = 10;

/* GET index page. */
module.exports = (dataHelpers) => {
  router.post('/register', async (req, res) => {
    const passwordDigest = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const inputObj = {
      username: req.body.username,
      passwordDigest
    };

    const userId = await dataHelpers.insertNewUser(inputObj);

    const returnObj = {
      userId
    };

    const jsonOutput = UserSerializer.serialize(returnObj);
    res.json(jsonOutput);
  });

  router.post('/login', (req, res) => {
    const inputObj = {
      username: req.body.username,
      password: req.body.password
    };
    res.json(inputObj);
  });

  return router;
};
