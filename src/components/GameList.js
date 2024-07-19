import React from 'react';

const GameList = ({ games }) => {
  const getGameWinner = (game) => {
    const players = game.players[0];
    if (game.winner === 'tie') {
      return "Tie";
    } else {
      if (players.player1.cue === game.winner) {
        return players.player1.name;
      } else if (players.player2.cue === game.winner) {
        return players.player2.name;
      }
    }
  }

  return (
    <div className="game-list">
      <h4>Previous Games</h4>
      <ul>
        {[...games].reverse().map((game) => (
          <li key={game._id}>
            Game Winner: {getGameWinner(game)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
