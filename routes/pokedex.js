const express = require('express');
const {
  getPokemonList,
  getPokemonByName,
} = require('../services/pokeapi');

const router = express.Router();

function getPaginationValue(value, fallback, minimum, maximum) {
  const parsedValue = Number.parseInt(value, 10);

  if (Number.isNaN(parsedValue)) {
    return fallback;
  }

  return Math.min(Math.max(parsedValue, minimum), maximum);
}

router.get('/', async (req, res, next) => {
  const limit = getPaginationValue(req.query.limit, 20, 1, 100);
  const offset = getPaginationValue(req.query.offset, 0, 0, Number.MAX_SAFE_INTEGER);

  try {
    const pokemonList = await getPokemonList({ limit, offset });

    res.render('index', {
      pokemon: pokemonList.results,
      count: pokemonList.count,
      limit,
      offset,
      previousOffset: Math.max(offset - limit, 0),
      nextOffset: offset + limit,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/pokemon/:name', async (req, res, next) => {
  try {
    const pokemon = await getPokemonByName(req.params.name);

    res.render('pokemon', { pokemon });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
