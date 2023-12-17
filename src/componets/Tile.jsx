import React, { useContext } from 'react';
import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import {AdjacentTiles} from '../helperFunctions/Helpers'
import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { AuthContext } from '../context/AuthContext';
import { PaladinContext } from '../context/PaldinContext';
import { TileContext } from '../context/TileContext';
import { SkeletonContext } from '../context/SkeletonContext';

const Tile = (props)=>{
  const rotation = props.tileRotation*90;
  const {currentUser} = useContext(AuthContext);
  const {gameInfo,setGameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2} = useContext(ActionContext);
  const {paladinInfo,setPaladinInfo} = useContext(PaladinContext);
  const {skeletonInfo,setSkeletonInfo} = useContext(SkeletonContext);
  const {tileInfo,setTileInfo} =useContext(TileContext);
  function HandleBoardAction(here){
    // paladin tile actions
    if(currentUser.uid == gameInfo[0].roles.paladin){
      const tempPaladinLocation = paladinInfo.paladinLoc;
      if( action == "crusade"){
        if( actionInfo1 == "move"){
          if(
            AdjacentTiles(
              tempPaladinLocation,
              here,
              (tempPaladinLocation-here),
              false,
              false, // edge case
              tileInfo,
            )){
            paladin.move(gameID[0],here);
            // if where was clicked is already revealed then skip the rotate step
            if( tileInfo[here].value.facing == "up"){
                setActionInfo1("attack");
            }else{
                setActionInfo1("rotate");
                tileInfo[here].value.facing = "up";
                setTileInfo([... tileInfo]);
            }
            // need to add spend hero cube here
          }
        }
      }else if( action == "sprint"){
        if(actionInfo1 > 0){
          if(tileInfo[here].value.facing == "up"){
            if(
              AdjacentTiles(
                tempPaladinLocation,
                here,
                (tempPaladinLocation-here),
                false,
                false, // edge case
                tileInfo,// edge case
              )){
                setActionInfo1( actionInfo1-1);
              paladin.move( gameID[0], here)
              // need to add spend hero cube here
              // need to add local move to speed up processing time
            }
          }
        }
      }
    }else if(currentUser.uid == gameInfo[0].roles.skeleton){
      if(gameInfo[0].phase == 2){
        if(action != null){
          if(skeletonInfo.movesLeft>0){
            const currentFieldName= action +"Loc";
            const currentSkeletonLocation = skeletonInfo[currentFieldName];
            if(AdjacentTiles(
              currentSkeletonLocation,
              here,
              (currentSkeletonLocation-here),
              false,
              false, // edge case
              tileInfo,
            )){
              console.log("this is adjacnet")
            }else{
              console.log("not adjacnet")
            }
            
          }
        }else{
          console.log("you need to start the march first")
        }
      }
    }
  }

  return(
    <div className='tile' style={{backgroundImage: `url(${props.tilePic})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    transform: `rotate(${rotation}deg)`
    }}
    onClick={()=>HandleBoardAction(props.num)}>
      <div className='pieceContainer' style={{transform: `rotate(${-rotation}deg)`}}>
        <div className='characters'>
          {props.characterIcons.map((e, k)=>{
            return(
              <img src={e} key={k}/>
            )
          })}
        </div>
        <div className='tokens'>
        {props.tokenIcons.map((e,k)=>{
            return(
              <img src={e} key={k}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Tile;