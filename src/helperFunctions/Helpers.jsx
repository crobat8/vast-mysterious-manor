import React, { useContext, useState,memo } from 'react';
import { PaladinContext } from '../context/PaldinContext';
import { SpiderContext } from '../context/SpiderContext';
import { TileContext } from '../context/TileContext';

//takes in a location and returns a list of all the player pieces on that space
export const FindCharacters = (location) => {
  const {paladinInfo} = useContext(PaladinContext);
  const {spiderInfo} = useContext(SpiderContext);
  
  // add more if statements to this for each other character piece as they become needed
  let ret = []
  //paladin
  if(paladinInfo.paladinLoc === location){
    ret.push("paladin")
  }
  //spiders
  if(spiderInfo.giantSpiderLoc === location){
    ret.push("giantSpider")
  }
  
  return ret
}

// start where you are playing from
// end where you are playing to
// overRideDoors if you are checking adjacent without doors
// returns true if adjacent and open doors
// returns false if either rooms arent adjacent or if they doors are closed
export const AdjacentTiles = (start,end,overRideDoors) =>{
  const {tileInfo} = useContext(TileContext);

  const startTile = tileInfo[start];
  const endTile = tileInfo[end];

  const startWalls =  checkOpenDoors(startTile);
  const endWalls = checkOpenDoors(endTile);
  
  if(start-7 == end){//north of start check
    return (startWalls[0]&&endWalls[2])||overRideDoors;
  }else if (start+1 == end){// east of start check
    return (startWalls[1]&&endWalls[3])||overRideDoors;
  }else if (start+7 == end){// south of start check
    return (startWalls[2]&&endWalls[0])||overRideDoors;
  }else if (start-1 == end){// west of start check
    return (startWalls[3]&&endWalls[1])||overRideDoors;
  }else{
    return false;
  }
}

// returns a boolean array with values corresponding to what walls are open
// [north,east,south,west]
function checkOpenDoors(tile) {
  if (tile.wallType == "Open") {
    return [true, true, true, true];
  } else if (tile.wallType == "N") {
    if (tile.rotation == 0) {
      return [true, false, false, false];
    } else if (tile.rotation == 1) {
      return [false, true, false, false];
    } else if (tile.rotation == 2) {
      return [false, false, true, false];
    } else if (tile.rotation == 3) {
      return [false, false, false, true];
    }
  } else if (tile.wallType == "Ne") {
    if (tile.rotation == 0) {
      return [true, true, false, false];
    } else if (tile.rotation == 1) {
      return [false, true, true, false];
    } else if (tile.rotation == 2) {
      return [false, false, true, true];
    } else if (tile.rotation == 3) {
      return [true, false, false, true];
    }
  } else if (tile.wallType == "Ns") {
    if (tile.rotation == 0) {
      return [true, false, true, false];
    } else if (tile.rotation == 1) {
      return [false, true, false, true];
    } else if (tile.rotation == 2) {
      return [true, false, true, false];
    } else if (tile.rotation == 3) {
      return [false, true, false, true];
    }
  } else if (tile.wallType == "Nes") {
    if (tile.rotation == 0) {
      return [true, true, true, false];
    } else if (tile.rotation == 1) {
      return [false, true, true, true];
    } else if (tile.rotation == 2) {
      return [true, false, true, true];
    } else if (tile.rotation == 3) {
      return [true, true, false, true];
    }
  }
}