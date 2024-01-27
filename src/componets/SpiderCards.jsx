import React, { useContext, useState,useEffect,memo } from 'react';
import { SpiderContext } from '../context/SpiderContext';

import {HandleCardPictures} from '../helperFunctions/Helpers'
import { ActionContext } from '../context/ActionContext';
import { GameContext } from '../context/GameContext';

import spider from '../playerFunctions/spider';

const SpiderCards = () =>{
  const {spiderInfo} = useContext(SpiderContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,clearActions} = useContext(ActionContext)
  const {gameInfo,gameID} = useContext(GameContext);
  
  function handleClick(ID,cardType){
    if(action == "scare"){
      spider.scare(ID[0],cardType);
      setAction(null);
    }else if(action != null 
      && actionInfo1 == null
      && gameInfo[0].turn == "spider" 
      && gameInfo[0].phase == 3){
        // need to assign action info 1 the card that was picked based 
        // based on conditions like what form the spider is in and what
        // card was picked
        //
        // need to have the set action info in 1 of these if statements
        // since we have the == null to get into this one.
      setActionInfo1(cardType);
      console.log(actionInfo1);
    }

  }

  if(!spiderInfo){
    return(
    
      <h2>
        loading
      </h2>
  
    )
  }
  const cards = HandleCardPictures(spiderInfo.spellCards);

  return(
    <div className='cardHolder'>
      <h2 className='cardTitle'>
        hand of cards
      </h2>
      <div className='cardDisplay'>
        {cards.map((cardImage,key)=>{
          return(
            <div style={{backgroundImage: `url(${cardImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            }}
            className='card'
            onClick={()=>handleClick(gameID,spiderInfo.spellCards[key])}>
              
            </div>
          )
        })}
      </div>

    </div>
  )
}
export default SpiderCards;