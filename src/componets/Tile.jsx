import React, { useContext, useState,memo } from 'react';

import { GameContext } from '../context/GameContext';
import gameBoard from '../img/game_images/board/mainBoard.png'
import pit from '../img/game_images/board/tiles/Pit_start.png'

const Tile = ()=>{
  const {gameInfo} = useContext(GameContext);

  return(
    <div className='tile'>
      <img src={pit}/>
    </div>
  )
}

export default Tile;