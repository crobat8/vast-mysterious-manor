import React, { useContext, useState,useEffect,memo } from 'react';
import { GameContext } from '../context/GameContext';

import characterImages from './characterImages';
import tokenImages from './tokenImages';
import paladin from '../playerFunctions/paladin';
import { PaladinContext } from '../context/PaldinContext';
import { SkeletonContext } from '../context/SkeletonContext';
import { SpiderContext } from '../context/SpiderContext';
import { ManorContext } from '../context/ManorContext';

const GameInformation = () =>{ 
  
  const{gameInfo} = useContext(GameContext);
  const{paladinInfo} = useContext(PaladinContext)
  const{skeletonInfo} = useContext(SkeletonContext);
  const{spiderInfo} = useContext(SpiderContext);
  const{manorInfo} = useContext(ManorContext);

  

  if(gameInfo==null){
    return(
      <h1>
        not in a game right now
      </h1>
    )
  }

  
  if(paladinInfo == null||skeletonInfo == null || spiderInfo == null ||manorInfo==null){
    return(
      <h1>
        loading player info
      </h1>
    )
  }

  function marchOrderDisplay(){
    const ret = []
    for(let i = 0;i<skeletonInfo.marchOrder.length;i++){
      if(skeletonInfo.skeletonsRevealed>i){
        ret.push(<p>{i+1}. {skeletonInfo.marchOrder[i]}</p>)
      }else{
        ret.push(<p>{i+1}. hidden</p>)
      }
    }
    return ret
  }
  
  const OmenDisplayRow = (props)=>{
    const omenKey = props.rowName + "Omens";
    return(
      <div style={{
        display:'grid',
        gridTemplateColumns: '3fr 1fr 1fr 1fr', 
        gap: '5px', 
        }}>
        <p>{props.rowName}:</p>
        {manorInfo[omenKey].map((e)=>{
          const manorOmenHolder = {
            width: '15px',
            height: '15px',
            backgroundColor: e === 'P' ? 'white' : e== 'T'? 'grey':'',
            border: '2px solid black'
          };
          return(
            <div style={manorOmenHolder}>
              
            </div>
          )
        })}
      </div>
    )
    
  }

  return (
    <div className="Info" >
      <div className='playerInfo' {...gameInfo[0].turn == "paladin" ? {id:'paladin'}:{id:''}}>
        <div className='left'>
          <img src={characterImages.paladin}/>
          <h3> Paladin</h3>
          <h6> player Name</h6> 
        </div>
        <div className='right'>
          <p> Health: {paladinInfo.health}</p>
          <p> Grit: {paladinInfo.grit}</p>
          <p> Fury: {paladinInfo.fury}</p>
          <p> Light: {paladinInfo.light}</p>
          <p> Hero Cubes: {paladinInfo.heroCubes}</p>
          <p> Strength: {paladinInfo.preps}</p>
          <p> Defense: {paladinInfo.preps}</p>
        </div>
      </div>
      <div className='playerInfo' {...gameInfo[0].turn == "skeleton" ? {id:'skeleton'}:{id:''}}>
        <div className='left'>
          <img src={tokenImages.skull}/>
          <h3> Skeleton</h3>
          <h6> player Name</h6>
        </div>
        <div className='right'>
          <p> stability: {skeletonInfo.stability}</p>
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
        </div>
        <div className='right'>
          <p>health: {spiderInfo.health}</p>
          <p>Terror: {spiderInfo.terror}</p>
          <p>Defense: {spiderInfo.defense}</p>
          <p>Spirit: {spiderInfo.spirit}</p>
          <p>Blood: {spiderInfo.blood}</p> 
          {spiderInfo.spiderlingsToMove[0]||
          spiderInfo.spiderlingsToMove[1]||
          spiderInfo.spiderlingsToMove[2]||
          spiderInfo.spiderlingsToMove[3]||
          spiderInfo.spiderlingsToMove[4]
          ?
          <p>Moves Left: {spiderInfo.movesLeft}</p>
          :
          <p>Moves Left: 0</p>
          }
        </div>
      </div>
      <div className='playerInfo' {...gameInfo[0].turn == "manor" ? {id:'manor'}:{id:''}}>
        <div className='left'>
          <img src={characterImages.wraith}/>
          <h3> Manor</h3>
          <h6> player Name</h6>
        </div>
        <div className='right'>
          <p>Omen Cubes: {manorInfo.omenCubes}</p>
          <p>Seals: {manorInfo.completedSeals}</p>
          <OmenDisplayRow rowName="reveal"/>
          <OmenDisplayRow rowName="shift"/>
          <OmenDisplayRow rowName="swap"/>
          <OmenDisplayRow rowName="wall"/>
          <OmenDisplayRow rowName="move"/>
          <OmenDisplayRow rowName="ritual"/>
        </div>
      </div>
    </div>
  )
}

export default GameInformation;