import React, { useState, useEffect } from 'react';
import ekis from '../ekis.png';
import oww from '../oww.png';

const GameFields = ({ games }) => {
    const [loaded, setLoaded] = useState(false);
    const [ekisCount, setEkisCount] = useState(0);
    const [owwCount, setOwwCount] = useState(0);

    useEffect(() => {
        const count = () => {
            setEkisCount(games.filter((game) => game.winner === 'X').length);
            setOwwCount(games.filter((game) => game.winner === 'O').length);
        }
        
        if (!loaded && games.length > 0) {
            count();
            setLoaded(true);
        }
    });
    

    return (
        <div className="game-counts">
            <div className='count'>
                <img src={ekis} alt="Ekis" />
                <h1>= {ekisCount}</h1>
            </div>
            <div className='count'>
                <img src={oww} alt="Oww" />
                <h1>= {owwCount}</h1>
            </div>
            
        </div>
    );
}

export default GameFields;