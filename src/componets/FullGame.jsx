import React, { useContext, useState,memo } from 'react';
import MiniGame from './MiniGame';
import { GameContext } from '../context/GameContext';

const FullGame = ()=>{
  const [gameState,setGameState]=useState(["NON","NON","NON",
                                           "NON","NON","NON",
                                           "NON","NON","NON"])
  const {gameInfo} = useContext(GameContext);
  const [turnPiece,setTurnPiece]=useState("X")
  const [lastPlayed,setLastPlayed]=useState(10)
  if (gameInfo.length == 0){
    return(
      <h1>
        searching for a game
      </h1>
    )
  }

  return(
    <div className='fullGame'>
      {gameInfo[0].mainGame.map((e,key)=>{
        const gameName = "g"+key;
        return(
          <MiniGame big={key}  
                gameNum={gameInfo[0][gameName]}
                winner = {gameInfo[0].mainGame[key]}
          />
        )
      })}
    </div>
  )
}

export default FullGame;