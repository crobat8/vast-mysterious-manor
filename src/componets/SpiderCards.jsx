import React, { useContext, useState,useEffect,memo } from 'react';
import { SpiderContext } from '../context/SpiderContext';

import {HandleCardPictures} from '../helperFunctions/Helpers'

const SpiderCards = () =>{
  const {spiderInfo} = useContext(SpiderContext);
  if(!spiderInfo){
    return(
    
      <h2>
        loading
      </h2>
  
    )
  }
  const cards = HandleCardPictures(spiderInfo.spellCards);
  console.log(cards)
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
            className='card'>
              
            </div>
          )
        })}
      </div>

    </div>
  )
}
export default SpiderCards;