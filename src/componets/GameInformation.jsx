import React, { useContext, useState,useEffect,memo } from 'react';
import { GameContext } from '../context/GameContext';

import characterImages from './characterImages';
import tokenImages from './tokenImages';

const GameInformation = () =>{ 
  
  const{gameInfo} = useContext(GameContext);
  console.log(gameInfo)
  if(gameInfo == null || gameInfo.length == 0){
    return(
      <h1>
        not in a game right now
      </h1>
    )
  }
  //still need to add name of players to database therefore i can display name under role
// heroCubes
// : 
// 3
// hitSpider
// : 
// false
// light
// : 
// 0

  return (
    <div className="Info" >
      <div className='playerInfo' {...gameInfo[0].turn == "paladin" ? {id:'paladin'}:{id:''}}>
        <div className='left'>
          <img src={characterImages.paladin}/>
          <h3> Paladin</h3>
        </div>
        <div className='right'>
          <p> Health: {gameInfo[0].paladinInfo.health}</p>
          <p> Grit: {gameInfo[0].paladinInfo.grit}</p>
          <p> Fury: {gameInfo[0].paladinInfo.fury}</p>
          <p> Hero Cubes: {gameInfo[0].paladinInfo.heroCubes}</p>

        </div>
      </div>
      <div className='playerInfo' {...gameInfo[0].turn == "skeleton" ? {id:'skeleton'}:{id:''}}>
        <div className='left'>
          <img src={tokenImages.skull}/>
          <h3> Skeleton</h3>
        </div>
        <div className='right'>

        </div>
      </div>
      <div className='playerInfo' {...gameInfo[0].turn == "spider" ? {id:'spider'}:{id:''}}>
        <div className='left'>
          <img src={characterImages.giantSpider}/>
          <h3> Spider</h3>
        </div>
        <div className='right'>

        </div>
      </div>
      <div className='playerInfo' {...gameInfo[0].turn == "manor" ? {id:'manor'}:{id:''}}>
        <div className='left'>
          <img src={characterImages.manor}/>
          <h3> Manor</h3>
        </div>
        <div className='right'>

        </div>
      </div>
    </div>
  )
}

export default GameInformation;