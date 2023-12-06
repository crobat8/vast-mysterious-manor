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
export const AdjacentTiles = (startTile,endTile,direction,overRideDoors) =>{
  const startWalls =  checkOpenDoors(startTile);
  const endWalls = checkOpenDoors(endTile);
  if(direction == 7){//north of start check
    console.log("north")
    return (startWalls[0]&&endWalls[2])||overRideDoors;
  }else if (direction == -1){// east of start check
    console.log("east")
    return (startWalls[1]&&endWalls[3])||overRideDoors;
  }else if (direction == -7){// south of start check
    console.log("south")
    return (startWalls[2]&&endWalls[0])||overRideDoors;
  }else if (direction == 1){// west of start check
    console.log("west")
    return (startWalls[3]&&endWalls[1])||overRideDoors;
  }else{
    console.log("not cardinal")
    return false;
  }
}

// returns a boolean array with values corresponding to what walls are open
// [north,east,south,west]
function checkOpenDoors(tile) {
  const tileVals = tile.value;
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