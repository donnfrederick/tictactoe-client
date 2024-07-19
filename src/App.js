import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Game from './components/Game';
import GameFields from './components/GameFields';
import GameForm from './components/GameForm';
import GameList from './components/GameList';
import GameCount from './components/GameCount';
import './App.css';

const App = () => {
  const defaultGame = {
    board: ['X', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'],
    currentPlayer: null,
    winner: null,
    _v: 0,
    _id: 0
  }

  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(defaultGame);
  const [hasWinner, setHasWinner] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [manlalaro, setManlalaro] = useState({
    player1: {
      name: "Player 1",
      cue: 'X'
    },
    player2: {
      name: "Player 2",
      cue: 'O'
    }
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:3001/games');
        setGames(response.data);

        if (response.data.length > 0) {
          const lastGame = response.data[response.data.length - 1];
          if (lastGame.winner == null) {
            setInGame(true);
          }

          setSelectedGame(lastGame);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchGames();
  }, []);

  const handleGameClick = async (index) => {
    if (!selectedGame.board[index] && inGame) {
      if (selectedGame && !hasWinner) {
        const newBoard = [...selectedGame.board];
        newBoard[index] = selectedGame.currentPlayer;
  
        const winner = checkWinner(newBoard);
        const nextPlayer = selectedGame.currentPlayer === 'X' ? 'O' : 'X';

        let game_winner = winner;

        if (winner === null && clicks === 8) {
          game_winner = "tie";
        }
  
        const updatedGame = {
          ...selectedGame,
          board: newBoard,
          currentPlayer: nextPlayer,
          winner: game_winner,
        };
  
        try {
          const response = await axios.put(
            `http://localhost:3001/games/${selectedGame._id}`,
            updatedGame
          );
          setSelectedGame(response.data);
          setGames(
            games.map((game) =>
              game._id === response.data._id ? response.data : game
            )
          );
  
          setClicks(clicks + 1);
          
          if (winner) {
            setHasWinner(true);
  
            setTimeout(() => {
              alert("Winner: " + getGameWinner(selectedGame, winner));
              setHasWinner(false);
              setInGame(false);
              setClicks(0);
              switchCue();
            }, 100);
          } else if (clicks === 8) {
            setTimeout(() => {
              alert("Game tie");
              setHasWinner(false);
              setInGame(false);
              setClicks(0);
              switchCue();
            }, 100);
          }
        } catch (error) {
          console.error('Error updating game:', error);
        }
      }
    }
  };

  const getGameWinner = (game, winner) => {
    if (winner === 'tie') {
      return "Tie";
    } else {
      const players = game.players[0];
      if (players.player1.cue === winner) {
        return players.player1.name;
      } else if (players.player2.cue === winner) {
        return players.player2.name;
      }
    }
  }

  const handleNewGame = (newGame) => {
    setInGame(true);
    setGames([...games, newGame]);
    setSelectedGame(newGame);
  };

  const handleChangePlayer = async(data) => {
    const playersData = manlalaro;
    playersData.player1.name = data.player1;
    playersData.player2.name = data.player2;

    await axios.post('http://localhost:3001/players', {
      players: {
        player1: data.player1,
        player2: data.player2
      }
    });

    setManlalaro(playersData);
    alert("Changes saved");
  }

  const switchCue = () => {
    const playersData = manlalaro;
    playersData.player1.cue = manlalaro.player1.cue === 'X' ? 'O' : 'X';
    playersData.player2.cue = manlalaro.player2.cue === 'X' ? 'O' : 'X';

    setManlalaro(playersData)
  }

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  return (
    <div className="App">
      <h1 id='header_text'>Tic Tac Toe</h1>
      <GameFields onChangePlayer={handleChangePlayer} playersData={manlalaro} />
      {selectedGame && (
        <Game game={selectedGame} onClick={handleGameClick} />
      )}
      {!inGame && (
        <GameForm onNewGame={handleNewGame} playersData={manlalaro} />
      )}
      <GameCount games={games} />
      <GameList games={games} />
    </div>
  );
};

export default App;
