import React, { useContext, useState,useEffect,memo } from 'react';
import { GameContext } from '../context/GameContext';

import characterImages from './characterImages';
import tokenImages from './tokenImages';
import paladin from '../playerFunctions/paladin';
import { PaladinContext } from '../context/PaldinContext';

const GameInformation = () =>{ 
  
  const{gameInfo} = useContext(GameContext);
  const{paladinInfo} = useContext(PaladinContext)

  if(paladinInfo == null){
    return(
      <h1>
        not in a game right now
      </h1>
    )
  }

  function marchOrderDisplay(){
    const ret = []
    for(let i = 0;i<gameInfo[0].skeletonInfo.skeletonsRevealed.length;i++){
      if(gameInfo[0].skeletonInfo.skeletonsRevealed[i]){
        ret.push(<p>{i}. {gameInfo[0].skeletonInfo.marchOrder[i]}</p>)
      }else{
        ret.push(<p>{i}. hidden</p>)
      }
    }
    return ret
  }



  function test(){
    paladin.testMessage();
  }
  console.log(paladinInfo)
  return (
    <div className="Info" >
      <div className='playerInfo' {...gameInfo[0].turn == "paladin" ? {id:'paladin'}:{id:''}}>
        <div className='left'>
          <img src={characterImages.paladin}/>
          <h3> Paladin</h3>
          <h6> player Name</h6>
          {gameInfo[0].turn == "paladin" ? <button onClick={()=>test()}> end phase</button>:<div/>}
        </div>
        <div className='right'>
          <p> Health: {paladinInfo.health}</p>
          <p> Grit: {paladinInfo.grit}</p>
          <p> Fury: {paladinInfo.fury}</p>
          <p> Hero Cubes: {paladinInfo.heroCubes}</p>
        </div>
      </div>
      {/* <div className='playerInfo' {...gameInfo[0].turn == "skeleton" ? {id:'skeleton'}:{id:''}}>
        <div className='left'>
          <img src={tokenImages.skull}/>
          <h3> Skeleton</h3>
          <h6> player Name</h6>
          {gameInfo[0].turn == "skeleton" ? <button> end phase</button>:<div/>}
        </div>
        <div className='right'>
          <p> march order</p>
          {marchOrderDisplay().map((e)=>{
            return(
              e
            )
          })}
        </div>
      </div>
      <div className='playerInfo' {...gameInfo[0].turn == "spider" ? {id:'spider'}:{id:''}}>
        <div className='left'>
          <img src={characterImages.giantSpider}/>
          <h3> Spider</h3>
          <h6> player Name</h6>
          {gameInfo[0].turn == "spider" ? <button> end phase</button>:<div/>}
        </div>
        <div className='right'>
          <p>health: {gameInfo[0].spiderInfo.health}</p>
          <p>Terror: {gameInfo[0].spiderInfo.terror}</p>
          <p>Defense: {gameInfo[0].spiderInfo.defense}</p>
          <p>Spirit: {gameInfo[0].spiderInfo.spirit}</p>
          <p>Blood: {gameInfo[0].spiderInfo.blood}</p>
        </div>
      </div>
      <div className='playerInfo' {...gameInfo[0].turn == "manor" ? {id:'manor'}:{id:''}}>
        <div className='left'>
          <img src={characterImages.manor}/>
          <h3> Manor</h3>
          <h6> player Name</h6>
          {gameInfo[0].turn == "manor" ? <button> end phase</button>:<div/>}
        </div>
        <div className='right'>
          <p>Omen Cubes: {gameInfo[0].manorInfo.omenCubes}</p>
          <p>Rituals: {gameInfo[0].spiderInfo.terror}</p>
        </div>
      </div> */}
    </div>
  )
}

export default GameInformation;