import React, { useState } from 'react';
import axios from 'axios';

const GameForm = ({ onNewGame, playersData }) => {
  const [loading, setLoading] = useState(false);

  const createGame = async () => {
    setLoading(true);

    const newGame = {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      players: playersData
    }

    try {
      const response = await axios.post('http://localhost:3001/games', newGame);
      onNewGame(response.data);
    } catch (error) {
      console.error('Error creating game:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-form">
      <button onClick={createGame} disabled={loading}>
        {loading ? 'Starting...' : 'Start'}
      </button>
    </div>
  );
};

export default GameForm;
