import React, { useContext, useState,useEffect,memo } from 'react';
import { SpiderContext } from '../context/SpiderContext';

import {HandleCardPictures,manorRitualInfo,findValidRitualPath} from '../helperFunctions/Helpers'
import { ActionContext } from '../context/ActionContext';
import { GameContext } from '../context/GameContext';

import paladin from '../playerFunctions/paladin';
import { PaladinContext } from '../context/PaldinContext';
import { ManorContext } from '../context/ManorContext';
import { TileContext } from '../context/TileContext';

const ManorCards = () =>{
  const {spiderInfo} = useContext(SpiderContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,clearActions,ActionUses,setActionUses} = useContext(ActionContext)
  const {gameInfo,gameID} = useContext(GameContext);
  const {manorInfo} = useContext(ManorContext);
  const {tileInfo,setTileInfo} =useContext(TileContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  function handleRitualClick(clickedRitualName){
    console.log(clickedRitualName)
    const temp = manorRitualInfo(clickedRitualName)
    console.log(temp)
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
          const currentRitualInfo = manorRitualInfo(manorInfo.ritualHand[key]);
          // console.log(currentRitualInfo)
          let playable = !(gameInfo[0].turn == "manor" && gameInfo[0].phase == 3);
          const pathResults = ["","","",""];
          for(let i = 0;i<4;i++ ){
            const currentPath = currentRitualInfo.path.map(num => (num + i)%4);
            pathResults[i] = 
              findValidRitualPath(
                tileInfo,
                manorInfo.wraithLoc,
                currentPath,
                currentRitualInfo.ghostIndex
              );
            playable = playable || pathResults[i].playablePath;
            
          }
          if(playable){
            console.log(pathResults)
          }
          return(
            <img 
            key={key}
            src={cardImage}
            alt={`Image ${key}`}
            className={`card ${hoveredIndex === key ? 'active' : ''}`}
            style={playable?{filter:'none'}:{filter:'grayscale(100%)'}}
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
            onClick={()=>handleRitualClick(manorInfo.ritualHand[key])}
            />
          )
        })}
      </div>
    </div>
  )
}
export default ManorCards;