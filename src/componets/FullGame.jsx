import React, { useContext, useState,memo } from 'react';

import { GameContext } from '../context/GameContext';
import Tile from './Tile';
import gameBoard from '../img/game_images/board/mainBoard.png'
import tileImages from './tileImages';

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
      return tileImages.entrance
    }else if(info.floorType == "pit"){
      if(info.facing == "down"){
        return tileImages.genBack
      }else if(info.wallType == "open"){
        return tileImages.pitOpen
      }else if(info.wallType == "nes"){
        return tileImages.pitNes
      }else if(info.wallType == "ne"){
        return tileImages.pitNes
      }else if(info.wallType == "ns"){
        return tileImages.pitNes
      }else if(info.wallType == "n"){
        return tileImages.pitNes
      }
    }else if(info.floorType == "armory"){
      if(info.facing == "down"){
        return tileImages.armoryBack
      }else if(info.wallType == "open"){
        return tileImages.armory
      }
      
    }else{
      return tileImages.entrance
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
              <div className='tile'/>
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