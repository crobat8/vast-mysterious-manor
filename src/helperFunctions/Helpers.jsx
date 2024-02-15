import React, { useContext, useState,memo } from 'react';
import { PaladinContext } from '../context/PaldinContext';
import { SpiderContext } from '../context/SpiderContext';
import { SkeletonContext } from '../context/SkeletonContext';

import { TileContext } from '../context/TileContext';

import cardImages from '../componets/cardImages';
import e from 'cors';

//takes in a location and returns a list of all the player pieces on that space
export const FindCharacters = (location) => {
  const {paladinInfo} = useContext(PaladinContext);
  const {spiderInfo} = useContext(SpiderContext);
  const {skeletonInfo} = useContext(SkeletonContext);
  // add more if statements to this for each other character piece as they become needed
  let ret = []
  //paladin
  if(paladinInfo.paladinLoc === location){
    ret.push("paladin");
  }
  //spiders (can be slightly optimized due to having form field in database)
  if(spiderInfo.giantSpiderLoc === location){
    ret.push("giantSpider");
  }
  if(spiderInfo.casterLoc === location){
    ret.push("caster");
  }
  if(spiderInfo.spiderling1Loc === location){
    ret.push("spiderling1");
  }
  if(spiderInfo.spiderling2Loc === location){
    ret.push("spiderling2");
  }
  if(spiderInfo.spiderling3Loc === location){
    ret.push("spiderling3");
  }
  if(spiderInfo.spiderling4Loc === location){
    ret.push("spiderling4");
  }
  if(spiderInfo.spiderling5Loc === location){
    ret.push("spiderling5");
  }
  
  //skeletons
  if(skeletonInfo.castyLoc === location){
    ret.push("casty");
  }
  if(skeletonInfo.screamyLoc === location){
    ret.push("screamy");
  }
  if(skeletonInfo.shinyLoc === location){
    ret.push("shiny");
  }
  if(skeletonInfo.shootyLoc === location){
    ret.push("shooty");
  }
  if(skeletonInfo.singyLoc === location){
    ret.push("singy");
  }
  if(skeletonInfo.slashyLoc === location){
    ret.push("slashy");
  }
  if(skeletonInfo.smashyLoc === location){
    ret.push("smashy");
  }
  if(skeletonInfo.sniffyLoc === location){
    ret.push("sniffy");
  }
  if(skeletonInfo.stabbyLoc === location){
    ret.push("stabby");
  }
  return ret
}
// returns true if the tile start is in [0] of one of the tile lists
export const isAdjacentTiles2 = (visibleTileLocations,start,countCenter) =>{
  let spotsToCheck = 4;

  if(countCenter){
    spotsToCheck = spotsToCheck + 1;
  }
  for(let i = 0;i<spotsToCheck;i++){
    if(visibleTileLocations[i][0] == start){
      // console.log(visibleTileLocations[i][0])
      // console.log(start)

      return true;
    }
  }
  return false;
}

// returns true if the tile start is in [0] of one of the tile lists
export const isVisible2 = (visibleTileLocations,start,countCenter) =>{
  let spotsToCheck = 4;

  if(countCenter){
    spotsToCheck = spotsToCheck + 1;
  }
  for(let i = 0;i<spotsToCheck;i++){
    for(let j = 0; j < visibleTileLocations[i].length;j++){
      if(visibleTileLocations[i][j] == start){
        return true;
      }
    }

  }
  return false;
}

// returns a double array of all visible tiles with [4] being 
// the original location so when being used in all situations [4][0] 
// can be used to as where the piece is
export const VisibleTiles = (location,tileInfo) =>{
  const ret = [[],[],[],[],[location]];
  for(let i = 0;i<4;i++){
    let tempLocation = location;
    let foundEdge = true;
    let foundDark = true;
    let foudWall = true;
    let direction;
    if(i == 0){
      direction = -7
    }else if(i == 1){
      direction = 1
    }else if(i == 2){
      direction = 7
    }else{
      direction = -1
    }
    
    while(checkOpenDoors(tileInfo[tempLocation].value)[i]&&
        foudWall && 
        foundEdge && 
        foundDark){
        console.log(tempLocation)
        console.log(tileInfo[tempLocation])
      if(i == 0){
        tempLocation = tempLocation-7;
        if(tempLocation<7){
          foundEdge = false;
        }else if(tileInfo[tempLocation].value.facing == "down"){
          foundDark = false;
        }
        if(tempLocation<0){
          break;
        }else if(tileInfo[tempLocation].value == ""){

        }else{
          if(checkOpenDoors(tileInfo[tempLocation].value)[(i+2)%4]){
            ret[i].push(tempLocation);
          }else{
            foudWall = false
          }
        }
      }else if(i == 1){
        tempLocation = tempLocation+1;
        if(tempLocation%7 == 6){
          foundEdge = false
        }else if(tileInfo[tempLocation].value.facing == "down"){
          foundDark = false;
        }
        if(tempLocation>=49){
          break;
        }else if(tileInfo[tempLocation].value == ""){

        }else{
          if(checkOpenDoors(tileInfo[tempLocation].value)[(i+2)%4]){
            ret[i].push(tempLocation);
          }else{
            foudWall = false
          }
        }
        
      }else if(i == 2){
        tempLocation = tempLocation+7;
        if(tempLocation>41){
          foundEdge = false
        }else if(tileInfo[tempLocation].value.facing == "down"){
          foundDark = false;
        }
        if(tempLocation>=49){
          break;
        }else if(tileInfo[tempLocation].value == ""){
        
        }else{
          if(checkOpenDoors(tileInfo[tempLocation].value)[(i+2)%4]){
            ret[i].push(tempLocation);
          }else{
            foudWall = false
          }
        }
      }else if(i == 3){
        tempLocation = tempLocation-1;
        if(tempLocation<0){
          break
        }
        if(tempLocation%7 == 0){
          foundEdge = false
        }else if(tileInfo[tempLocation].value.facing == "down"){
          foundDark = false;
        }
        if(tileInfo[tempLocation].value == ""){

        }else{
          if(checkOpenDoors(tileInfo[tempLocation].value)[(i+2)%4]){
            ret[i].push(tempLocation);
          }else{
            foudWall = false
          }
        }
        
      }
    }
  }
  return ret;
}

export const CountToken = (tokenType,tileInfo)=>{
  let ret = 0
  for(let i = 0;i<tileInfo.length;i++){
    if(tileInfo[i].value == ''){

    }else{
      for(let j = 0;j<tileInfo[i].value.tokens.length;j++){
        if(tileInfo[i].value.tokens[j] == tokenType){
          ret++;
        }
      }
    }
  }
  return ret;

}

export const HandleCardPictures =(cardNames) =>{
  let ret = []
  for(let i = 0; i < cardNames.length;i++){
    ret.push(cardImages[cardNames[i]]);
  }
  return ret
}

// returns a boolean array with values corresponding to what walls are open
// [north,east,south,west]
function checkOpenDoors(tileVals) {

  if (tileVals.wallType == "Open"||tileVals.facing == "down") {
    return [true, true, true, true];
  } else if (tileVals.wallType == "N") {
    if (tileVals.rotation == 0) {
      return [true, false, false, false];
    } else if (tileVals.rotation == 1) {
      return [false, true, false, false];
    } else if (tileVals.rotation == 2) {
      return [false, false, true, false];
    } else if (tileVals.rotation == 3) {
      return [false, false, false, true];
    }
  } else if (tileVals.wallType == "Ne") {
    if (tileVals.rotation == 0) {
      return [true, true, false, false];
    } else if (tileVals.rotation == 1) {
      return [false, true, true, false];
    } else if (tileVals.rotation == 2) {
      return [false, false, true, true];
    } else if (tileVals.rotation == 3) {
      return [true, false, false, true];
    }
  } else if (tileVals.wallType == "Ns") {
    if (tileVals.rotation == 0) {
      return [true, false, true, false];
    } else if (tileVals.rotation == 1) {
      return [false, true, false, true];
    } else if (tileVals.rotation == 2) {
      return [true, false, true, false];
    } else if (tileVals.rotation == 3) {
      return [false, true, false, true];
    }
  } else if (tileVals.wallType == "Nes") {
    if (tileVals.rotation == 0) {
      return [true, true, true, false];
    } else if (tileVals.rotation == 1) {
      return [false, true, true, true];
    } else if (tileVals.rotation == 2) {
      return [true, false, true, true];
    } else if (tileVals.rotation == 3) {
      return [true, true, false, true];
    }
  }
  return [false, false, false, false];
}