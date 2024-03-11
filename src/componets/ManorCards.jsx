import React, { useContext, useState,useEffect,memo } from 'react';
import { SpiderContext } from '../context/SpiderContext';

import {HandleCardPictures} from '../helperFunctions/Helpers'
import { ActionContext } from '../context/ActionContext';
import { GameContext } from '../context/GameContext';

import paladin from '../playerFunctions/paladin';
import { PaladinContext } from '../context/PaldinContext';
import { ManorContext } from '../context/ManorContext';

const ManorCards = () =>{
  const {spiderInfo} = useContext(SpiderContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,clearActions,ActionUses,setActionUses} = useContext(ActionContext)
  const {gameInfo,gameID} = useContext(GameContext);
  const {manorInfo} = useContext(ManorContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  function handleFavorClick(clickedFavor){
    
  }

  function handleTreasureClick(clickedTreasure){

  }

  if(!manorInfo){
    return(
      <h2>
        loading
      </h2>
  
    )
  }

  const ritualHand = HandleCardPictures(manorInfo.ritualHand);

  return(
    <div className='cardHolder'>
      <h1>
        ritualHand
      </h1>
      <div className='marchOrderDisplay'>
        {ritualHand.map((cardImage,key)=>{
          
          return(
            <img 
            key={key}
            src={cardImage}
            alt={`Image ${key}`}
            className={`card ${hoveredIndex === key ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
            onClick={()=>handleTreasureClick(manorInfo.ritualHand[key])}
            />
          )
        })}
      </div>
    </div>
  )
}
export default ManorCards;