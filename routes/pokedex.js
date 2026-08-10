const express = require('express');
const { getPokemonList, getPokemonByName } = require('../services/pokeapi');

const Favorite = require('../models/Favorite');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const router = express.Router();
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

function getPositiveInteger(value, fallback, maximum) {
  const parsedValue = Number.parseInt(value, 10);

  if (!Number.isInteger(parsedValue) || parsedValue < 0) {
    return fallback;
  }

  return maximum ? Math.min(parsedValue, maximum) : parsedValue;
}

router.get('/', async (req, res, next) => {
  const limit =
    getPositiveInteger(
      req.query.limit,
      DEFAULT_LIMIT,
      MAX_LIMIT
    ) || DEFAULT_LIMIT;

  const offset = getPositiveInteger(req.query.offset, 0);

  try {
    const pokemonList = await getPokemonList({
      limit,
      offset,
    });

    let favorites = [];

    if (req.isAuthenticated()) {
      favorites = await Favorite.find({
        user: req.user._id,
      }).sort({ createdAt: -1 });
    }

    res.render('index', {
      pokemon: pokemonList.results,
      count: pokemonList.count,
      limit,
      offset,
      favorites,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/pokemon/:name', async (req, res) => {
  try {
    const pokemon = await getPokemonByName(req.params.name);

    if (!pokemon) {
      return res.status(404).send('Pokemon not found');
    }

    let isFavorite = false;

    if (req.isAuthenticated()) {
      const favorite = await Favorite.findOne({
        user: req.user._id,
        pokemonId: pokemon.id,
      });

      isFavorite = !!favorite;
    }

    res.render('pokemon', {
      pokemon,
      isFavorite,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

router.post(
  '/pokemon/:name/favorite',
  ensureAuthenticated,
  async (req, res) => {
    try {
      const pokemon = await getPokemonByName(req.params.name);

      if (!pokemon) {
        return res.status(404).send('Pokemon not found');
      }

      await Favorite.create({
        user: req.user._id,
        pokemonId: pokemon.id,
        pokemonName: pokemon.name,
        sprite: pokemon.sprites.front_default,
      });

      res.redirect(`/pokemon/${pokemon.name}`);
    } catch (error) {
      // If the Pokemon is already a favorite,
      // simply return to the Pokemon page.
      if (error.code === 11000) {
        return res.redirect(`/pokemon/${req.params.name}`);
      }

      console.error('Error adding favorite:', error);
      res.status(500).send('Unable to add favorite');
    }
  }
);

router.post(
  '/pokemon/:name/favorite/delete',
  ensureAuthenticated,
  async (req, res) => {
    try {
      const pokemon = await getPokemonByName(req.params.name);

      if (!pokemon) {
        return res.status(404).send('Pokemon not found');
      }

      await Favorite.deleteOne({
        user: req.user._id,
        pokemonId: pokemon.id,
      });

      res.redirect(`/pokemon/${pokemon.name}`);
    } catch (error) {
      console.error('Error removing favorite:', error);
      res.status(500).send('Unable to remove favorite');
    }
  }
);

module.exports = router;
