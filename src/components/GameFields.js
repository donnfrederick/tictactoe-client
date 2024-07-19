import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ekis from '../ekis.png';
import oww from '../oww.png';

const GameFields = ({ onChangePlayer, playersData }) => {
    const [player1, setPlayer1] = useState("Player 1");
    const [player2, setPlayer2] = useState("Player 2");

    useEffect(() => {
        const loadPlayer = async() => {
            const players = await axios.get('http://localhost:3001/players');

            if (players.data.length > 0) {
            setPlayer1(players.data[players.data.length - 1].players[0].player1);
            setPlayer2(players.data[players.data.length - 1].players[0].player2);
            }
        }

        loadPlayer();
    }, []);

    const changePlayer = () => {
        onChangePlayer({
            player1: player1,
            player2: player2
        });
    }

    return (
        <div className="players">
            <div className='player1'>
                <input value={player1}
                    onChange={(event) => {
                        setPlayer1(event.target.value);
                    }}
                />
                {playersData.player1.cue === 'X' && (
                    <img src={ekis} alt="Ekis" />
                )}
                {playersData.player1.cue === 'O' && (
                    <img src={oww} alt="Oww" />
                )}
            </div>
            <div className='player2'>
                <input value={player2}
                    onChange={(event) => {
                        setPlayer2(event.target.value);
                    }}
                />
                {playersData.player2.cue === 'X' && (
                    <img src={ekis} alt="Ekis" />
                )}
                {playersData.player2.cue === 'O' && (
                    <img src={oww} alt="Oww" />
                )}
            </div>
            <button onClick={changePlayer}>
            Save
            </button>
        </div>
    );
}

export default GameFields;