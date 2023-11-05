import React, { useContext, useState,memo } from 'react';

import { GameContext } from '../context/GameContext';
import Tile from './Tile';
import gameBoard from '../img/game_images/board/mainBoard.png'
import tileImages from './tileImages';
import characterImages from './characterImages';
import tokenImages from './tokenImages';

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
    if(info.facing == "down"){
      if(info.floorType == "armory"){
        return tileImages.armoryBack
      }else{
        return tileImages.genBack
      }
    }else if(info.floorType == "start"){
      return tileImages.start
    }else{
      const tileName = ""+info.floorType+info.wallType;
      return tileImages[tileName]
    }
  }

  function handleCharacterIcons(info){
    let ret = []
    for(let i = 0; i < info.length;i++){
      ret.push(characterImages[info[i]])
    }

    return ret
  }

  function handleTokenIcons(info){
    let ret = []
    for(let i = 0; i < info.length;i++){
      ret.push(tokenImages[info[i]])
    }
    return ret
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

          const tilePicture = handlePicture(tile);
          const characterIcons = handleCharacterIcons(tile.characters);
          const tokenIcons = handleTokenIcons(tile.tokens);
          return(
            <Tile
              tilePic={tilePicture}
              tileWalls={tile.walls}
              tileRotation={tile.rotation}
              characterIcons={characterIcons}
              tokenIcons={tokenIcons}
            />
          )
        })}
      </div>


    </div>
  )
}

export default FullGame;