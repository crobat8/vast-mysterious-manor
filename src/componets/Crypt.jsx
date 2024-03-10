import React, { useContext } from 'react';
import general from '../playerFunctions/general';
import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';
import { SkeletonContext } from '../context/SkeletonContext';
import { SpiderContext } from '../context/SpiderContext';
import { TileContext } from '../context/TileContext';
import { AuthContext } from '../context/AuthContext';
import {isAdjacentTiles2, VisibleTiles, getcrypts} from '../helperFunctions/Helpers'

import skeleton from '../playerFunctions/skeleton';
import spider from '../playerFunctions/spider';


const Crypt = (props)=>{
  const {currentUser} = useContext(AuthContext);
  const {gameInfo,setGameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,setActionInfo3,setActionInfo4,actionUses,setActionUses,clearActions} = useContext(ActionContext);
  const {paladinInfo,setPaladinInfo} = useContext(PaladinContext);
  const {skeletonInfo,setSkeletonInfo} = useContext(SkeletonContext);
  const {spiderInfo} = useContext(SpiderContext);
  const {tileInfo,setTileInfo} =useContext(TileContext);

  function HandleCryptAction(here){
    if(currentUser.uid == gameInfo[0].roles.skeleton 
      && gameInfo[0].turn == "skeleton"){
      if(gameInfo[0].phase == 2){
        if(skeletonInfo.movesLeft>0 && action == null){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo);
          const currentFieldName= skeletonInfo.currentSkeleton +"Loc";
          const currentSkeletonLocation = skeletonInfo[currentFieldName];
          const tempCryptArray = getcrypts(here,tileInfo);
          if(here == 0){
            console.log(gameID[0])
            console.log(here)
            console.log(skeletonInfo.currentSkeleton)
          }
          if(
            isAdjacentTiles2(
              tempVisibleTileArray,
              currentSkeletonLocation,
              false
            )){

              skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton);
              // connect to move skeleton piece to {here}
          }else if(
          isAdjacentTiles2(
            tempCryptArray,
            currentSkeletonLocation,
            false
          )){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton);
          }else if(here == 45 && currentSkeletonLocation == -1 ){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
          }else if(here == 35 && currentSkeletonLocation == -3 ){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
          }else if(here == 7  && currentSkeletonLocation == -5 ){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
          }else if(here == 1  && currentSkeletonLocation == -6 ){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
          }else if(here == 5  && currentSkeletonLocation == -8 ){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
          }else if(here == 13 && currentSkeletonLocation == -9 ){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
          }else if(here == 41 && currentSkeletonLocation == -11){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton)
          }else{
            console.log("not adjacnet")
          }
        }else{
          console.log("out of movements");
        }
      }
    }
  }

  return(
    <div className='crypt' onClick={()=>HandleCryptAction(props.num)}>
      <div className='pieceContainer'>
        <div className='characters'>
          {props.characterIcons.map((e, k)=>{
            return(
              <img src={e} key={k}/>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default Crypt;