const express = require('express');
const router = express.Router();
const redis = require('../redis')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (_, res) => {
  const addedTodos = Number(await redis.getAsync('addedTodos') || 0)
  res.send({
    added_todos: addedTodos
  });
});


module.exports = router;
