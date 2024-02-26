import React, { useContext } from 'react';
import general from '../playerFunctions/general';
import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';
import { SkeletonContext } from '../context/SkeletonContext';
import { SpiderContext } from '../context/SpiderContext';
import { TileContext } from '../context/TileContext';
import { AuthContext } from '../context/AuthContext';
import {isAdjacentTiles2, isVisible2, VisibleTiles} from '../helperFunctions/Helpers'

import skeleton from '../playerFunctions/skeleton';
import spider from '../playerFunctions/spider';

const Ground = (props)=>{
  const {currentUser} = useContext(AuthContext);
  const {gameInfo,setGameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,setActionInfo3,setActionInfo4,actionUses,setActionUses,clearActions} = useContext(ActionContext);
  const {paladinInfo,setPaladinInfo} = useContext(PaladinContext);
  const {skeletonInfo,setSkeletonInfo} = useContext(SkeletonContext);
  const {spiderInfo} = useContext(SpiderContext);
  const {tileInfo,setTileInfo} =useContext(TileContext);

  

  function HandleGroundAction(here){
    console.log("clicked",here)
    if(currentUser.uid == gameInfo[0].roles.skeleton 
      && gameInfo[0].turn == "skeleton"){
      if(gameInfo[0].phase == 2){
        if(skeletonInfo.movesLeft>0 && action == null){
          const currentSkeletonLocKey = skeletonInfo.currentSkeleton + "Loc";
          const currentSkeletonLoc = skeletonInfo[currentSkeletonLocKey];
          if(skeletonInfo[currentSkeletonLocKey]<0){
            const distanceFromCurrent = Math.abs(currentSkeletonLoc-here )
            console.log("currentSkeletonLoc",currentSkeletonLoc)
            console.log("here",here)
            if(distanceFromCurrent == 1 || distanceFromCurrent == 11){
              skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
            }
          }else if(here == -1  && currentSkeletonLoc == 45){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
          }else if(here == -3  && currentSkeletonLoc == 35){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
          }else if(here == -5  && currentSkeletonLoc == 7 ){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
          }else if(here == -6  && currentSkeletonLoc == 1 ){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
          }else if(here == -8  && currentSkeletonLoc == 5 ){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
          }else if(here == -9  && currentSkeletonLoc == 13){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
          }else if(here == -11 && currentSkeletonLoc == 41){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
          }
        }else{
          console.log("out of movements");
        }
      }
    }
  }  

  return(
    <div className={props.groundName}
    onClick={()=>HandleGroundAction(props.groundLocation)}>
        {props.characterIcons.map((e, k)=>{
          return(
            <img src={e} key={k}/>
          )
        })}
    </div>
  )
}

export default Ground;