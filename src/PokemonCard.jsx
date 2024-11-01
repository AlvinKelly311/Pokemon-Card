import React, { useState, useEffect } from 'react';
import { getPokemons } from './Api';



const randomImage = (pokemonDataArray) => {
  const randomIndex = Math.floor(Math.random() * pokemonDataArray.length);
  return pokemonDataArray[randomIndex];
};

const PokemonCard = ({ onScoreUpdate }) => {
  const [pokemonDataArray, setPokemonDataArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flippedCards, setFlippedCards] = useState({}); // State to track flipped cards
  const [currentScore, setCurrentScore] = useState(0); // State to track current score

  useEffect(() => {
    setLoading(true);
    const pokemonNames = ['ivysaur', 'charmander', 'squirtle', 'pikachu', 'bulbasaur', ];
    const promises = pokemonNames.map((ID) => {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${ID}
        `)
        .then((response) => response.json())
        .then((data) => data);
    });
    Promise.all(promises)
      .then((data) => {
        setPokemonDataArray(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleRandomize = (id) => {
    const randomPokemon = randomImage(pokemonDataArray);
    setFlippedCards((prevFlippedCards) => ({
      ...prevFlippedCards,
      [id]: randomPokemon, // Update only the clicked card
    }));
     const matched = randomPokemon.name === pokemonDataArray.find((pokemon) => pokemon.id === id).name;

    onScoreUpdate(matched); // Update the score
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='image-grid'>
      {pokemonDataArray.map((pokemonData) => (
        <div key={pokemonData.id}>
          <div className='color'>
            <h2>{pokemonData.name}</h2>
            <button onClick={() => handleRandomize(pokemonData.id)}>
              <img 
                src={flippedCards[pokemonData.id] ? flippedCards[pokemonData.id].sprites.front_default : pokemonData.sprites.front_default} 
                alt={flippedCards[pokemonData.id] ? flippedCards[pokemonData.id].name : pokemonData.name} 
              />
            </button>
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonCard;