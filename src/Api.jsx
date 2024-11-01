import axios from 'axios';

export const getPokemons = async (pokemonNames) => {
  const promises = pokemonNames.map((name) => {
    // Assuming you have an API endpoint that returns Pokémon data
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((data) => data);
  });
  return Promise.all(promises);
};