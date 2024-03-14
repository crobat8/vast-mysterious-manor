import React, { useContext } from 'react';
import {getcrypts, isAdjacentTiles2, isVisible2, VisibleTiles} from '../helperFunctions/Helpers'
import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { AuthContext } from '../context/AuthContext';

import { PaladinContext } from '../context/PaldinContext';
import { SkeletonContext } from '../context/SkeletonContext';
import { SpiderContext } from '../context/SpiderContext';
import { ManorContext } from '../context/ManorContext';
import { TileContext } from '../context/TileContext';

import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import skeleton from '../playerFunctions/skeleton';
import spider from '../playerFunctions/spider';
import manor from '../playerFunctions/manor';

const Tile = (props)=>{
  const rotation = props.tileRotation*90;
  const {currentUser} = useContext(AuthContext);
  const {gameInfo,setGameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,setActionInfo3,setActionInfo4,actionUses,setActionUses,clearActions} = useContext(ActionContext);
  const {paladinInfo,setPaladinInfo} = useContext(PaladinContext);
  const {skeletonInfo,setSkeletonInfo} = useContext(SkeletonContext);
  const {spiderInfo} = useContext(SpiderContext);
  const {manorInfo} = useContext(ManorContext);
  const {tileInfo,setTileInfo} =useContext(TileContext);
  const fangTargets = ["paladin","casty","screamy","shiny","shooty","singy","slashy","smashy","sniffy","stabby",]
  
  //checks for overlaps in 2 arrays 
  function checkOverlap(array1, array2) {
    // Create a Set from the first array for faster lookup
    const set = new Set(array1);
    
    // Iterate through the second array
    for (let i = 0; i < array2.length; i++) {
        // If the current element exists in the set, return true (overlap found)
        if (set.has(array2[i])) {
            return true;
        }
    }
    
    // If no overlap found, return false
    return false;
  }

  function checkForToken(tokenArray,tokenLookingFor){
    if(tokenArray.includes(tokenLookingFor)){
      return true
    } else {
      return false
    }
  }

  function checkForStrikable(currentSkeletonLocation){
    if(currentSkeletonLocation == paladinInfo.paladinLoc){
      return true;
    } else if (currentSkeletonLocation == spiderInfo.giantSpiderLoc){
      return true;
    } else if (currentSkeletonLocation == spiderInfo.casterLoc){
      return true;
    }
    return false
  }

  function HandleBoardAction(here){
    if(currentUser.uid == gameInfo[0].roles.paladin 
      && gameInfo[0].turn == "paladin"){
      const tempPaladinLocation = paladinInfo.paladinLoc;
      if( action == "crusade"){
        if( actionInfo1 == "move"){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          if(
            isAdjacentTiles2(
              tempVisibleTileArray,
              tempPaladinLocation,
              true
            )){
            paladin.move(gameID[0],here);
            // if where was clicked is already revealed then skip the rotate step
            if( tileInfo[here].value.facing == "up"){
              setActionInfo1("attack");
            }else{
              paladin.changeGrit(gameID[0],2,"G")
              setActionInfo1("rotate");
              setActionInfo4(0);
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
              isAdjacentTiles2(
                tempVisibleTileArray,
                tempPaladinLocation,
                false
              )){
              if(tileInfo[here].value.tokens.indexOf("web") == -1){
                setActionInfo1( actionInfo1-1);
              }else{
                setActionInfo1(0);
              }
              paladin.move( gameID[0], here);
            }
          }
        }
      }
    }else if(currentUser.uid == gameInfo[0].roles.skeleton 
      && gameInfo[0].turn == "skeleton"){
      if(gameInfo[0].phase == 2){
        if(skeletonInfo.movesLeft>0 && action == null){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFieldName= skeletonInfo.currentSkeleton +"Loc";
          const currentSkeletonLocation = skeletonInfo[currentFieldName];
          const tempCryptArray = getcrypts(here,tileInfo);
          if(!checkForStrikable(currentSkeletonLocation)){
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
              // connect to move skeleton piece to {here}
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
          } else {
            console.log("tile has something strikable")
          }
        }else if(action == "tunnel" ){
          if(tileInfo[here].value.floorType == "pit" && tileInfo[here].value.facing == "up"){
            skeleton.move(gameID[0],here,skeletonInfo.currentSkeleton);
            skeleton.endMarch(gameID[0]);
            clearActions();
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
          const currentFormKey = spiderInfo.form + "Loc";
          const currentFormLoc = spiderInfo[currentFormKey];
          if(
            isAdjacentTiles2(
              tempVisibleTileArray,
              currentFormLoc,
              true
            )){
            if(tileInfo[here].value.facing == "down"){
              setActionInfo2("rotate");
              setActionInfo3(here);
              setActionInfo4(0);
              tileInfo[here].value.facing = "up";
              setTileInfo([... tileInfo]);
            }
          }
        }else if(action == "fangs" && actionInfo1 != null){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFormKey = spiderInfo.form + "Loc";
          const currentFormLoc = spiderInfo[currentFormKey];
          if(
            isAdjacentTiles2(
              tempVisibleTileArray,
              currentFormLoc,
              true
            )){
              if(checkOverlap(props.pieces,fangTargets)){
                spider.changeBlood(gameID[0],1);
                if(actionUses == 2){
                  setActionUses(1)
                }else{
                  spider.discard(gameID[0],actionInfo1);
                  clearActions();
                }
              }     
          }
        }else if(action == "webs" && actionInfo1 != null){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFormKey = spiderInfo.form + "Loc";
          const currentFormLoc = spiderInfo[currentFormKey];
          if(
            isAdjacentTiles2(
              tempVisibleTileArray,
              currentFormLoc,
              true
            )){
            general.addToken(gameID[0],here,"web");
            if(actionUses == 2){
              setActionUses(1)
            }else{
              spider.discard(gameID[0],actionInfo1);
              clearActions();
            }
          }
        }else if(action == "layEgg" && actionInfo1 != null){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFormKey = spiderInfo.form + "Loc";
          const currentFormLoc = spiderInfo[currentFormKey];
          if(
            isAdjacentTiles2(
              tempVisibleTileArray,
              currentFormLoc,
              true
            )){
            general.addToken(gameID[0],here,"egg");
            spider.discard(gameID[0],actionInfo1);
            clearActions();
          }
        }else if(action == "move" && spiderInfo.movesLeft > 0){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFormKey = actionInfo1;
          const currentFormLoc = spiderInfo[currentFormKey];

          if(
            isAdjacentTiles2(
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
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFormKey = spiderInfo.form + "Loc";
          const currentFormLoc = spiderInfo[currentFormKey];
          if(
            isVisible2(
              tempVisibleTileArray,
              currentFormLoc,
              true
            )){
            if(tileInfo[here].value.facing == "down"){
              setActionInfo2("rotate");
              setActionInfo3(here);
              setActionInfo4(0);
              tileInfo[here].value.facing = "up";
              setTileInfo([... tileInfo]);
            }       
          }
        }else if(action == "fangs" && actionInfo1 != null){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFormKey = spiderInfo.form + "Loc";
          const currentFormLoc = spiderInfo[currentFormKey];
          if(
            isVisible2(
              tempVisibleTileArray,
              currentFormLoc,
              true
            )){
              if(checkOverlap(props.pieces,fangTargets)){
                spider.changeBlood(gameID[0],1);
                if(actionUses == 2){
                  setActionUses(1)
                }else{
                  spider.discard(gameID[0],actionInfo1);
                  clearActions();
                }
              }     
          }
        }else if(action == "webs" && actionInfo1 != null){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFormKey = spiderInfo.form + "Loc";
          const currentFormLoc = spiderInfo[currentFormKey];
          if(
            isVisible2(
              tempVisibleTileArray,
              currentFormLoc,
              true
            )){
            general.addToken(gameID[0],here,"web");
            if(actionUses == 2){
              setActionUses(1)
            }else{
              spider.discard(gameID[0],actionInfo1);
              clearActions();
            }
          }
        }else if(action == "veil" && actionInfo1 != null){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFormKey = spiderInfo.form + "Loc";
          const currentFormLoc = spiderInfo[currentFormKey];
          if(
            isVisible2(
              tempVisibleTileArray,
              currentFormLoc,
              true
            )){
            if(props.thisTile.value.facing == "up"){
              console.log("this tile is facing up")
              general.hideTile(gameID[0],here);
              spider.discard(gameID[0],actionInfo1);
              clearActions();
            }

          }
        }else if(action == "move" && spiderInfo.movesLeft > 0){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFormKey = actionInfo1;
          const currentFormLoc = spiderInfo[currentFormKey];
          console.log(tempVisibleTileArray);
          if(
            isAdjacentTiles2(
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
      }else if(spiderInfo.form == "spiderling"){
        if(action == "eyes" && actionInfo1 != null){
          for(let i = 1;i<=5 ;i++){
            const spiderlingKey = "spiderling"+ i + "Loc";
            if(spiderInfo[spiderlingKey] == here && actionUses[i-1]){
              if(tileInfo[here].value.facing == "down"){
                actionUses[i-1] = false
                console.log(actionUses);
                setActionUses(actionUses);
                setActionInfo2("rotate");
                setActionInfo3(here);
                setActionInfo4(0);
                tileInfo[here].value.facing = "up";
                setTileInfo([... tileInfo]);
              }
            }
          }

        }else if(action == "fangs" && actionInfo1 != null){
          for(let i = 1;i<=5 ;i++){
            const spiderlingKey = "spiderling"+ i + "Loc";
            if(spiderInfo[spiderlingKey] == here && actionUses[i-1]){
              if(checkOverlap(props.pieces,fangTargets)){
                actionUses[i-1] = false
                spider.changeBlood(gameID[0],1);
              }
            }
          }
        }else if(action == "webs" && actionInfo1 != null){
          for(let i = 1;i<=5 ;i++){
            const spiderlingKey = "spiderling"+ i + "Loc";
            if(spiderInfo[spiderlingKey] == here && actionUses[i-1]){
              actionUses[i-1] = false
              general.addToken(gameID[0],here,"web");
            }
          }
        }else if(action == "loot" && actionInfo1 != null){
          for(let i = 1;i<=5 ;i++){
            const spiderlingKey = "spiderling"+ i + "Loc";
            if(spiderInfo[spiderlingKey] == here && actionUses[i-1]){
              if(checkForToken(props.tokens,"treasure")){
                setActionInfo2(actionInfo2+1);
                actionUses[i-1] = false;
                general.removeToken(gameID[0],here,"treasure");
              }
            }
          }
        }else if(action == "move" && spiderInfo.movesLeft > 0){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const currentFormKey = actionInfo1;
          const currentFormLoc = spiderInfo[currentFormKey];
          if(
            isAdjacentTiles2(
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
          for(let i = 1;i<=5 ;i++){
            const spiderlingKey = "spiderling"+ i + "Loc";
            if(spiderInfo[spiderlingKey] == here && spiderInfo.spiderlingsToMove[i-1]){
              setAction("move");
              setActionInfo1(spiderlingKey);
            }
          }

        }
      }

    }else if(currentUser.uid == gameInfo[0].roles.spider 
      && gameInfo[0].specialTurn == "spider"){
        if(gameInfo[0].specialPhase == "takeDamage"){
          const tempVisibleTileArray = VisibleTiles(here,tileInfo)
          const takeDamageLoc = spiderInfo.takeDamageLoc;
          if(
            isAdjacentTiles2(
              tempVisibleTileArray,
              takeDamageLoc,
              false
            )){
            spider.finsishTakeDamage(gameID[0],here);
          }
        }
    }else if(currentUser.uid == gameInfo[0].roles.manor 
      && gameInfo[0].turn == "manor"){
      if(manorInfo.wraithLoc < 0){
        manor.wraithMove(gameID[0],here);
      } else if(gameInfo[0].phase == 4){
        if(tileInfo[here].value.facing == "down"){
          if(manorInfo.treasuresToPlay > 0){
            general.addToken(gameID[0],here,"treasure");
            manor.placeTreasure(gameID[0]);
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