import React, { useContext, useState,useEffect,memo } from 'react';
import { SpiderContext } from '../context/SpiderContext';

import {HandleCardPictures} from '../helperFunctions/Helpers'
import { ActionContext } from '../context/ActionContext';
import { GameContext } from '../context/GameContext';

import paladin from '../playerFunctions/paladin';
import { PaladinContext } from '../context/PaldinContext';

const ManorCards = () =>{
  const {spiderInfo} = useContext(SpiderContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,clearActions,ActionUses,setActionUses} = useContext(ActionContext)
  const {gameInfo,gameID} = useContext(GameContext);
  const {paladinInfo} = useContext(PaladinContext);

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

  if(!paladinInfo){
    return(
      <h2>
        loading
      </h2>
  
    )
  }

  const favors = HandleCardPictures(paladinInfo.favorCards);
  const gear = HandleCardPictures(paladinInfo.treasureCards);

  return(
    <div className='cardHolder'>
      {/* <h1 className='cardTitle'>
       favors in play
      </h1>
      <div className='marchOrderDisplay'>
        {favors.map((cardImage,key)=>{
          return(
            <img 
            key={key}
            src={cardImage}
            alt={`Image ${key}`}
            className={`card ${hoveredIndex === key ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
            onClick={()=>handleFavorClick(paladinInfo.favorCards[key])}
            />
          )
        })}
      </div> */}
      <h1>
        treasures in play
      </h1>
      <div className='marchOrderDisplay'>
        {gear.map((cardImage,key)=>{
          
          return(
            <img 
            key={key}
            src={cardImage}
            alt={`Image ${key}`}
            className={`card ${hoveredIndex === key ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
            onClick={()=>handleTreasureClick(paladinInfo.treasureCards[key])}
            />
          )
        })}
      </div>
    </div>
  )
}
export default ManorCards;