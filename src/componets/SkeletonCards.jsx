import React, { useContext, useState} from 'react';

import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';
import { SkeletonContext } from '../context/SkeletonContext';

import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import skeleton from '../playerFunctions/skeleton';
import { TileContext } from '../context/TileContext';

import {HandleCardPictures} from '../helperFunctions/Helpers'


const SkeletonCards = () =>{ 
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {skeletonInfo} = useContext(SkeletonContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  function marchOrderCardDisplay(){
    const cardNames = [];
    for(let i = 0;i<skeletonInfo.marchOrder.length;i++){
      if(skeletonInfo.skeletonsRevealed>i){
        cardNames.push(skeletonInfo.marchOrder[i])
        const tempEquipMentAccess = skeletonInfo.marchOrder[i] + "Equiped"; 
        for(let j = 0; j<3; j++){
          if(skeletonInfo[tempEquipMentAccess][j] == ""){
            cardNames.push("gear_back")
          }else {
            cardNames.push(skeletonInfo[tempEquipMentAccess][j])
          }
        }
      }else{
        cardNames.push("skeletonCharacterBack")
        for(let j = 0; j<3; j++){
          cardNames.push("gear_back")
        }
      }
    }
    return HandleCardPictures(cardNames);
  }

  if(!skeletonInfo){
    return(
      <h1>
        loading
      </h1>
    )
  }

  return (
    <div className='cardHolder'>
      <h1 className='cardTitle'>
        March order top to bottom
      </h1>
      <div className='marchOrderDisplay'>
        {marchOrderCardDisplay().map((cardImage,key)=>{
          return(
            <img 
            key={key}
            src={cardImage}
            alt={`Image ${key}`}
            className={`card ${hoveredIndex === key ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
            />
          )
        })}
      </div>

      <h1>
        Hand of cards (click one to put it in play)
      </h1>
    </div>
  )
}

export default SkeletonCards;