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
import { ActionContext } from '../context/ActionContext';
import Ground from './Ground';

const FullGame = ()=>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {tileInfo} = useContext(TileContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,actionInfo3,actionInfo4} = useContext(ActionContext);
  const {paladinInfo} = useContext(PaladinContext)
  const groundsKeys = [-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12];
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

  function handleCharacterIcons(pieces){
    let ret = []
    for(let i = 0; i < pieces.length;i++){
      if(pieces[i].slice(0,-1) == "spiderling"){
        ret.push(characterImages["spiderling"])
      }else{
        ret.push(characterImages[pieces[i]])
      }

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

  function handleRotation(TileVal,loc){
    if(action == "crusade"){
      if(actionInfo1 == "rotate"){
        if(paladinInfo.paladinLoc == loc){
          return actionInfo2;
        }
      }
    } else if(action == "eyes"){
      if(actionInfo1 != null){
        if(actionInfo2 != null){
          if(actionInfo3 == loc){
            return actionInfo4;
          }

        }
      }
    }
    return TileVal.rotation;
  }

  return(
    <div className='Board' style={{backgroundImage: `url(${gameBoard})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
      <div className='tiles'>
        {tileInfo.map((tile,key)=>{
          const pieces = FindCharacters(key);
          const characterIcons = handleCharacterIcons(pieces);
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
          const tileAdjustedRotation = handleRotation(TileVal,key);
          const thisTile = tile
          return(
            <Tile
              tilePic={tilePicture}
              tileRotation={tileAdjustedRotation}
              characterIcons={characterIcons}
              tokenIcons={tokenIcons}
              pieces={pieces}
              thisTile={thisTile}
              num={key}
            />
          )
        })}
      </div>
      {groundsKeys.map((groundNum,key)=>{
        const characterIcons = handleCharacterIcons(groundNum);
        const groundName = 'ground'+groundNum
        return(
          <Ground
          characterIcons = {characterIcons}
          groundName = {groundName}
          />
        )
      })}
    </div>
  )
}

export default FullGame;