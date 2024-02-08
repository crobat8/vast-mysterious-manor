import React, { useContext } from 'react';
import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import {AdjacentTiles,AdjacentTiles2, VisibleTiles} from '../helperFunctions/Helpers'
import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { AuthContext } from '../context/AuthContext';

import { PaladinContext } from '../context/PaldinContext';
import { SkeletonContext } from '../context/SkeletonContext';
import { SpiderContext } from '../context/SpiderContext';
import { TileContext } from '../context/TileContext';

import skeleton from '../playerFunctions/skeleton';
import spider from '../playerFunctions/spider';

const Tile = (props)=>{
  const rotation = props.tileRotation*90;
  const {currentUser} = useContext(AuthContext);
  const {gameInfo,setGameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,setActionInfo3,clearActions} = useContext(ActionContext);
  const {paladinInfo,setPaladinInfo} = useContext(PaladinContext);
  const {skeletonInfo,setSkeletonInfo} = useContext(SkeletonContext);
  const {spiderInfo} = useContext(SpiderContext);
  const {tileInfo,setTileInfo} =useContext(TileContext);
  
  function HandleBoardAction(here){
    if(currentUser.uid == gameInfo[0].roles.paladin 
    && gameInfo[0].turn == "paladin"){
      const tempPaladinLocation = paladinInfo.paladinLoc;
      if( action == "crusade"){
        if( actionInfo1 == "move"){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          if(
            AdjacentTiles2(
              tempVisibleTileArray,
              tempPaladinLocation,
              true
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
            const tempVisibleTileArray = VisibleTiles(here,tileInfo)
            if(
              AdjacentTiles2(
                tempVisibleTileArray,
                tempPaladinLocation,
                false
              )){
                setActionInfo1( actionInfo1-1);
              paladin.move( gameID[0], here)
              // need to add spend hero cube here
              // need to add local move to speed up processing time
            }
          }
        }
      }
    }else if(currentUser.uid == gameInfo[0].roles.skeleton 
    && gameInfo[0].turn == "skeleton"){
      if(gameInfo[0].phase == 2){
        if(skeletonInfo.movesLeft>0){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFieldName= skeletonInfo.currentSkeleton +"Loc";
          const currentSkeletonLocation = skeletonInfo[currentFieldName];

          if(
            AdjacentTiles2(
              tempVisibleTileArray,
              currentSkeletonLocation,
              false
            )){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton);
            // connect to move skeleton piece to {here}
          }else{
            console.log("not adjacnet")
          }
        }else{
          console.log("out of movements");
        }
      }
    }else if(currentUser.uid == gameInfo[0].roles.spider 
    && gameInfo[0].turn == "spider"){
      if(spiderInfo.form == "giantSpider"){
        if(action == "eyes" && actionInfo1 != null){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFormKey = actionInfo1;
          const currentFormLoc = spiderInfo[currentFormKey];
          if(
            AdjacentTiles2(
              tempVisibleTileArray,
              currentFormLoc,
              true
            )){
            if(tileInfo[here].value.facing == "down"){
              setActionInfo2("rotate");
              setActionInfo3(here);
              tileInfo[here].value.facing = "up";
              setTileInfo([... tileInfo]);
            }       
          }
        }else if(action == "fangs" && actionInfo1 != null){

        }else if(action == "webs" && actionInfo1 != null){
          
        }else if(action == "layEgg" && actionInfo1 != null){

        }else if(action == "move" && spiderInfo.movesLeft > 0){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFormKey = actionInfo1;
          const currentFormLoc = spiderInfo[currentFormKey];
          
          if(
            AdjacentTiles2(
              tempVisibleTileArray,
              currentFormLoc,
              false
            )){
            if(spiderInfo.movesLeft == 1){
              spider.move(gameID[0],here,currentFormKey,0);
              
              clearActions();
            }else{
              spider.move(gameID[0],here,currentFormKey,0);
            }
          }
        }else if(action == null){
          const currentFormKey = spiderInfo.form + "Loc";
          const currentFormLoc = spiderInfo[currentFormKey];
          if(currentFormLoc == here){
            setAction("move");
            setActionInfo1(currentFormKey);
          }
        }
      }else if(spiderInfo.form == "caster"){
        if(action == "eyes" && actionInfo1 != null){
          setActionInfo2("rotate");
          setActionInfo3(here);
          tileInfo[here].value.facing = "up";
          setTileInfo([... tileInfo]);
        }else if(action == "move" && spiderInfo.movesLeft > 0){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)

          const currentFormKey = actionInfo1;
          const currentFormLoc = spiderInfo[currentFormKey];
          if(
            AdjacentTiles2(
              tempVisibleTileArray,
              currentFormLoc,
              false
            )){
            if(spiderInfo.movesLeft == 1){
              if(spiderInfo.form == "spiderling" ){
                const tempSpiderlingNum = +actionInfo1[10];
                spider.move(gameID[0],here,currentFormKey,tempSpiderlingNum);
              }else{
                spider.move(gameID[0],here,currentFormKey,0);
              }
              clearActions();
            }else{
              spider.move(gameID[0],here,currentFormKey,0);
            }
          }
        }else if(action == null){
          const currentFormKey = spiderInfo.form + "Loc";
          const currentFormLoc = spiderInfo[currentFormKey];
          if(currentFormLoc == here){
            setAction("move");
            setActionInfo1(currentFormKey);
          }
          if(spiderInfo.form == "spiderling"){
            for(let i = 1;i<=5 ;i++){
              const spiderlingKey = "spiderling"+ i + "Loc";
              if(spiderInfo[spiderlingKey] == here && spiderInfo.spiderlingsToMove[i-1]){
                setAction("move");
                setActionInfo1(spiderlingKey);
              }
            }
          }else{
            const currentFormKey = spiderInfo.form + "Loc";
            const currentFormLoc = spiderInfo[currentFormKey];
            if(currentFormLoc == here){
              setAction("move");
              setActionInfo1(currentFormKey);
            }
          }
        }
      }else if(spiderInfo.form == "spiderling"){
        if(action == "eyes" && actionInfo1 != null){
          setActionInfo2("rotate");
          setActionInfo3(here);
          tileInfo[here].value.facing = "up";
          setTileInfo([... tileInfo]);
        }else if(action == "move" && spiderInfo.movesLeft > 0){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFormKey = actionInfo1;
          const currentFormLoc = spiderInfo[currentFormKey];
          if(
            AdjacentTiles2(
              tempVisibleTileArray,
              currentFormLoc,
              false
            )){
            if(spiderInfo.movesLeft == 1){
              if(spiderInfo.form == "spiderling" ){
                const tempSpiderlingNum = +actionInfo1[10];
                spider.move(gameID[0],here,currentFormKey,tempSpiderlingNum);
              }else{
                spider.move(gameID[0],here,currentFormKey,0);
              }
              clearActions();
            }else{
              spider.move(gameID[0],here,currentFormKey,0);
            }
          }
        }else if(action == null){
          const currentFormKey = spiderInfo.form + "Loc";
          const currentFormLoc = spiderInfo[currentFormKey];
          if(currentFormLoc == here){
            setAction("move");
            setActionInfo1(currentFormKey);
          }
          if(spiderInfo.form == "spiderling"){
            for(let i = 1;i<=5 ;i++){
              const spiderlingKey = "spiderling"+ i + "Loc";
              if(spiderInfo[spiderlingKey] == here && spiderInfo.spiderlingsToMove[i-1]){
                setAction("move");
                setActionInfo1(spiderlingKey);
              }
            }
          }else{
            const currentFormKey = spiderInfo.form + "Loc";
            const currentFormLoc = spiderInfo[currentFormKey];
            if(currentFormLoc == here){
              setAction("move");
              setActionInfo1(currentFormKey);
            }
          }
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
        {/* <p style={{color: 'white'}}>
          {props.num}
        </p> */}
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