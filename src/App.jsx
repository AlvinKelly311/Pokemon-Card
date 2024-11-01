import React, { useState } from 'react';
import PokemonCard from './PokemonCard';

const App = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const handleScoreUpdate = (matched) => {

    if (matched) {

      setBestScore(currentScore);

      setCurrentScore(0);

    } else {

      setCurrentScore(currentScore + 1);

    }

  };

  return (
    <div className='container'>
      <div className='boxs'>
        <h1>Pokemon</h1>
        <div className='text'>
          <h3>Scores: {currentScore}</h3>
          <h3>Best score: {bestScore}</h3>
        </div>
      </div>

      <PokemonCard onScoreUpdate={handleScoreUpdate} />
    </div>
  );
};

export default App;