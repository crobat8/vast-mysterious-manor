import React, { useContext, useState,memo } from 'react';
import { PaladinContext } from '../context/PaldinContext';
import { SpiderContext } from '../context/SpiderContext';
import { SkeletonContext } from '../context/SkeletonContext';

import { TileContext } from '../context/TileContext';

import cardImages from '../componets/cardImages';

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
    ret.push("spiderling");
  }
  if(spiderInfo.spiderling2Loc === location){
    ret.push("spiderling");
  }
  if(spiderInfo.spiderling3Loc === location){
    ret.push("spiderling");
  }
  if(spiderInfo.spiderling4Loc === location){
    ret.push("spiderling");
  }
  if(spiderInfo.spiderling5Loc === location){
    ret.push("spiderling");
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

// startTile coming from
// endTile coming from
// overRideDoors if you are checking adjacent without doors
// returns true if adjacent and open doors
// returns false if either rooms arent adjacent or if they doors are closed
export const AdjacentTiles = (startLoc,endLoc,direction,overRideDoors,edge,tileInfo) =>{
  let startWalls = [true,true,true,true];
  if(tileInfo[startLoc].value ==""){
  }else{
    const startTileVal = tileInfo[startLoc].value;
    startWalls =  checkOpenDoors(startTileVal);
  }
  let endWalls = [true,true,true,true];
  if(tileInfo[endLoc].value == ""){
  }else{
    const endTileVal = tileInfo[endLoc].value
    endWalls = checkOpenDoors(endTileVal);
  }
  if(direction == 7){//north of start check
    return (startWalls[0]&&endWalls[2])||overRideDoors;
  }else if (direction == -1){// east of start check
    return (startWalls[1]&&endWalls[3])||overRideDoors;
  }else if (direction == -7){// south of start check
    return (startWalls[2]&&endWalls[0])||overRideDoors;
  }else if (direction == 1){// west of start check
    return (startWalls[3]&&endWalls[1])||overRideDoors;
  }else{
    return false;
  }
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