const axios = require('axios');

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

async function getPokemonList({ limit = 20, offset = 0 } = {}) {
  const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon`, {
    params: { limit, offset },
  });

  return response.data;
}

async function getPokemonByName(name) {
  const response = await axios.get(
    `${POKEAPI_BASE_URL}/pokemon/${encodeURIComponent(name)}`
  );
  const { data } = response;

  return {
    name: data.name,
    id: data.id,
    sprites: data.sprites,
    types: data.types,
    height: data.height,
    weight: data.weight,
    stats: data.stats,
  };
}

module.exports = {
  getPokemonList,
  getPokemonByName,
};
