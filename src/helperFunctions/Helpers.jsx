import React, { useContext, useState,memo } from 'react';
import { PaladinContext } from '../context/PaldinContext';
import { SpiderContext } from '../context/SpiderContext';

// add more if statements to this for each other character piece as they become needed
export const FindCharacters = (location) => {
  const {paladinInfo} = useContext(PaladinContext);
  const {spiderInfo} = useContext(SpiderContext);

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