import React, { useContext, useState,memo } from 'react';

import { GameContext } from '../context/GameContext';
import gameBoard from '../img/game_images/board/mainBoard.png'
import pit from '../img/game_images/board/tiles/Pit_start.png'

const Tile = (props)=>{
  const {gameInfo} = useContext(GameContext);

  const rotation = props.tileRotation*90;
  return(
    <div className='tile'>
      <img src={props.tilePic} style={{transform: `rotate(${rotation}deg)`}}/>
    </div>
  )
}

export default Tile;