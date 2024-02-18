import React, { useContext, useState} from 'react';

import { GameContext } from '../context/GameContext';
import { PaladinContext } from '../context/PaldinContext';
import { SkeletonContext } from '../context/SkeletonContext';

import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import skeleton from '../playerFunctions/skeleton';
import { TileContext } from '../context/TileContext';

import {HandleCardPictures} from '../helperFunctions/Helpers'


const SkeletonCards = () =>{ 
  const {gameInfo,gameID} = useContext(GameContext);
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

  function handOfGearPictures(){
    const cardNames = [];
    for(let i = 0;i<skeletonInfo.itemsInHand.length;i++){
      cardNames.push(skeletonInfo.itemsInHand[i])
    }
    return HandleCardPictures(cardNames);
  }

  function checkIfRevealed(skeletonName){
    for(let i = 0;i<skeletonInfo.skeletonsRevealed;i++){
      if(skeletonName == skeletonInfo.marchOrder[i]){
        return true
      }
    }
    return false
  }

  function handleCardEquip(index){
    //do this for all skeletons
    const castyItems = ["ashStaff", "fetish", "runestone"];
    const screamyItems = ["banner", "horn", "pauldro"];
    const shinyItems = ["bloodMace", "darkLamp", "scryingOrb"];
    const shootyItems = ["bombBag", "flameArrow", "longbow"];
    const singyItems = ["danceShoes", "lute", "pipe"];
    const slashyItems = ["greatAxe", "helmet", "shield"];
    const smashyItems = ["pickaxe", "sledgeHammer", "spike"];
    const sniffyItems = ["bagOfTreats", "bellCollar", "leash"];
    const stabbyItems = ["kukri", "leatherBoots", "poison"];
    
    if(castyItems.includes(skeletonInfo.itemsInHand[index]) && checkIfRevealed("casty")){
      skeleton.equipGear(gameID[0],"casty",skeletonInfo.itemsInHand[index]);
    } else if (screamyItems.includes(skeletonInfo.itemsInHand[index])&& checkIfRevealed("screamy")){
      skeleton.equipGear(gameID[0],"screamy",skeletonInfo.itemsInHand[index]);
    } else if (shinyItems.includes(skeletonInfo.itemsInHand[index])&& checkIfRevealed("shiny")){
      skeleton.equipGear(gameID[0],"shiny",skeletonInfo.itemsInHand[index]);
    } else if (shootyItems.includes(skeletonInfo.itemsInHand[index])&& checkIfRevealed("shooty")){
      skeleton.equipGear(gameID[0],"shooty",skeletonInfo.itemsInHand[index]);
    } else if (singyItems.includes(skeletonInfo.itemsInHand[index])&& checkIfRevealed("singy")){
      skeleton.equipGear(gameID[0],"singy",skeletonInfo.itemsInHand[index]);
    } else if (slashyItems.includes(skeletonInfo.itemsInHand[index])&& checkIfRevealed("slashy")){
      skeleton.equipGear(gameID[0],"slashy",skeletonInfo.itemsInHand[index]);
    } else if (smashyItems.includes(skeletonInfo.itemsInHand[index])&& checkIfRevealed("smashy")){
      skeleton.equipGear(gameID[0],"smashy",skeletonInfo.itemsInHand[index]);
    } else if (sniffyItems.includes(skeletonInfo.itemsInHand[index])&& checkIfRevealed("sniffy")){
      skeleton.equipGear(gameID[0],"sniffy",skeletonInfo.itemsInHand[index]);
    } else if (stabbyItems.includes(skeletonInfo.itemsInHand[index])&& checkIfRevealed("stabby")){
      skeleton.equipGear(gameID[0],"stabby",skeletonInfo.itemsInHand[index]);
    }
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
      <div className='marchOrderDisplay'>
        {handOfGearPictures().map((cardImage,key)=>{
          
          return(
            <img 
            key={key}
            src={cardImage}
            alt={`Image ${key}`}
            className={`card ${hoveredIndex === key ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
            onClick={()=>handleCardEquip(key)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SkeletonCards;