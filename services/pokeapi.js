const axios = require('axios');

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

async function getPokemonList({ limit, offset }) {
  const response = await axios.get(POKEAPI_BASE_URL, {
    params: { limit, offset },
  });

  return response.data;
}

async function getPokemonByName(name) {
  const normalizedName = String(name).trim().toLowerCase();
  const response = await axios.get(`${POKEAPI_BASE_URL}/${encodeURIComponent(normalizedName)}`);
  const pokemon = response.data;

  return {
    name: pokemon.name,
    id: pokemon.id,
    sprites: pokemon.sprites,
    types: pokemon.types,
    height: pokemon.height,
    weight: pokemon.weight,
    stats: pokemon.stats,
  };
}

module.exports = {
  getPokemonList,
  getPokemonByName,
};
