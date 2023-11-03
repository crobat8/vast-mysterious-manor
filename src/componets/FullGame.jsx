import React, { useContext, useState,memo } from 'react';
import MiniGame from './MiniGame';
import { GameContext } from '../context/GameContext';

const FullGame = ()=>{
  const {gameInfo} = useContext(GameContext);
  if(gameInfo == null){
    console.log(gameInfo)
    return(
      <div className='Board'>
        not in a game select what role you want 
      </div>
    )
  }
  console.log(gameInfo)
  return(
    <div className='Board'>
      here is the game baord
    </div>
  )
}

export default FullGame;