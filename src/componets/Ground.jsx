import React, { useContext } from 'react';
import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import {AdjacentTiles} from '../helperFunctions/Helpers'
import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { AuthContext } from '../context/AuthContext';
import { PaladinContext } from '../context/PaldinContext';
import { TileContext } from '../context/TileContext';

function handleGroundAction(x){
  console.log(x)
}

const Ground = (props)=>{
  return(
    <div className={props.groundName}
    onClick={()=>handleGroundAction(props)}>
        {props.characterIcons.map((e, k)=>{
          return(
            <img src={e} key={k}/>
          )
        })}
    </div>
  )
}

export default Ground;