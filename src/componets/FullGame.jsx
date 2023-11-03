import React, { useContext, useState,memo } from 'react';

import { GameContext } from '../context/GameContext';
import gameBoard from '../img/game_images/board/mainBoard.png'

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
      <img className="background" src={gameBoard} style={{maxheight:"100%", maxwidth:"100%"}} alt=""/>
    </div>
  )
}

export default FullGame;