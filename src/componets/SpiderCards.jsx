import React, { useContext, useState,useEffect,memo } from 'react';
import { SpiderContext } from '../context/SpiderContext';

import {HandleCardPictures} from '../helperFunctions/Helpers'
import { ActionContext } from '../context/ActionContext';
import { GameContext } from '../context/GameContext';

import spider from '../playerFunctions/spider';

const SpiderCards = () =>{
  const {spiderInfo} = useContext(SpiderContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,clearActions,ActionUses,setActionUses} = useContext(ActionContext)
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
      if(action == "eyes"){
        if(cardType == "eyes"
        || spiderInfo.form == "caster"){
          setActionInfo1(cardType);
          
        }
      }
      if(action == "fangs"){
        if(cardType == "fangs"
        || spiderInfo.form == "giantSpider"){
          setActionInfo1(cardType);
        }
      }
      if(action == "webs"){
        if(cardType == "webs"
        || spiderInfo.form == "spiderling"){
          setActionInfo1(cardType);
        }
      }
      if(action == "veil"){
        setActionInfo1(cardType);
      }
      if(action == "tend"){
        setActionInfo1(cardType);
      }
      if(action == "layEgg"){
        setActionInfo1(cardType);
      }
      if(action == "legs"){
        setActionInfo1(cardType);
      }
      if(action == "loot"){
        setActionInfo1(cardType);
        setActionInfo2(0);
      }

      if(spiderInfo.form == "giantSpider"){
        if(action == "layEgg"){
          setActionUses(1);
        }else{
          setActionUses(2);
        }
      }else if(spiderInfo.form == "caster"){
        setActionUses(1);
      }else if(spiderInfo.form == "spiderling"){
        const spiderlingActions = new Array(spiderInfo.health).fill(true);
        setActionUses(spiderlingActions);
      }
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