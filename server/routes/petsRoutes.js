import express from 'express';
import PetsSerializer from '../serializers/pets';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.get('/', (req, res) => {
    const result = dataHelpers.findAll();

    const jsonOutput = PetsSerializer.serialize(result);
    res.json(jsonOutput);
  });

  return router;
};
