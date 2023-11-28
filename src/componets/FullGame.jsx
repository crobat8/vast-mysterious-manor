import React, { useContext, useState,memo } from 'react';

import Tile from './Tile';
import Crypt from './Crypt';

import gameBoard from '../img/game_images/board/mainBoard.png'

import tileImages from './tileImages';
import characterImages from './characterImages';
import tokenImages from './tokenImages';

import {FindCharacters} from '../helperFunctions/Helpers'

import { GameContext } from '../context/GameContext';
import { TileContext } from '../context/TileContext';
import { PaladinContext } from '../context/PaldinContext';
import { SpiderContext } from '../context/SpiderContext';

const FullGame = ()=>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {tileInfo} = useContext(TileContext);
  const paladinInfo = useContext(PaladinContext);
  const spiderInfo = useContext(SpiderContext)
  
  if(gameInfo == null||gameInfo.length == 0){
    return(
      <div className='Board'>
        not in a game select what role you want 
      </div>
    )
  }else if(tileInfo == null){
    return(
      <div className='Board'>
        loading tile info
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

  function handleCharacterIcons(location){
    
    const pieces = FindCharacters(location)
    let ret = []
    for(let i = 0; i < pieces.length;i++){
      ret.push(characterImages[pieces[i]])
    }
    return ret
  }

  function handleTokenIcons(info2){
    let ret = []
    for(let i = 0; i < info2.length;i++){
      ret.push(tokenImages[info2[i]])
    }
    return ret
  }

  return(
    <div className='Board' style={{backgroundImage: `url(${gameBoard})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
      <div className='tiles'>
        {tileInfo.map((tile,key)=>{

          const characterIcons = handleCharacterIcons(key);

          if(tile.value == ""){
            return(
              <Crypt
              characterIcons={characterIcons}
              num={key}
              />
            )
          }
          // might need to move tile val stuff up before crypt initialization
          // only if i find a need to put tokens on a crypt space
          const TileVal = tile.value;
          const tokenIcons = handleTokenIcons(TileVal.tokens);
          const tilePicture = handlePicture(TileVal);
          return(
            <Tile
              tilePic={tilePicture}
              tileRotation={TileVal.rotation}
              characterIcons={characterIcons}
              tokenIcons={tokenIcons}
              num={key}
            />
          )
        })}
      </div>
    </div>
  )
}

export default FullGame;