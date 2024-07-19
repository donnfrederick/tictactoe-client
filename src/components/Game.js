import React from 'react';
import ekis from '../ekis.png';
import oww from '../oww.png';

const Game = ({ game, onClick }) => {
  const handleClick = (index) => {
    onClick(index);
  };

  return (
    <div className="game">
      <div className="board">
        {game.board.map((cell, index) => (
          <div
            key={index}
            id={'cell_' + index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {cell === 'X' && (
              <img src={ekis} alt="Ekis" />
            )}

            {cell === 'O' && (
              <img src={oww} alt="Oww" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
