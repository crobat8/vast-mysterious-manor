import React, { useContext, useState,memo } from 'react';

import { GameContext } from '../context/GameContext';
import Tile from './Tile';
import gameBoard from '../img/game_images/board/mainBoard.png'
import entrance from '../img/game_images/board/tiles/entrance_nes.png'
import back from '../img/game_images/board/tiles/back/back_general.png'
import pit from '../img/game_images/board/tiles/Pit_start.png'

const FullGame = ()=>{
  const {gameInfo} = useContext(GameContext);
  if(gameInfo == null||gameInfo.length == 0){
    console.log(gameInfo)
    return(
      <div className='Board'>
        not in a game select what role you want 
      </div>
    )
  }
  
  function handlePicture(info){
    if(info.floorType == "start"){
      return entrance
    }else{
      return pit
    }
  }

  return(
    <div className='Board' style={{backgroundImage: `url(${gameBoard})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
      <div className='tiles'>
        {gameInfo[0].tiles.map((tile,k)=>{
          if(tile == ""){
            return(
              <div/>
              
            )
          }
          let tilePicture = handlePicture(tile);
          return(
            <Tile
              tilePic={tilePicture}
              tileWalls={tile.walls}
              tileRotation={tile.rotation}
            />
          )
        })}
      </div>


    </div>
  )
}

export default FullGame;