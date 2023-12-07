import React, { useContext } from 'react';
import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import {AdjacentTiles} from '../helperFunctions/Helpers'
import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { AuthContext } from '../context/AuthContext';
import { PaladinContext } from '../context/PaldinContext';
import { TileContext } from '../context/TileContext';

const handleBoardAction = (neededActionInputs)=>{
  // paladin tile actions
  if(neededActionInputs.currentUser.uid == neededActionInputs.gameInfo[0].roles.paladin){
    const tempPaladinLocation =neededActionInputs.paladinInfo.paladinLoc;
    const movingTo = neededActionInputs.location;
    if(neededActionInputs.action == "crusade"){
      if(neededActionInputs.actionInfo1 == "move"){
        if(
          AdjacentTiles(
            neededActionInputs.tileInfo[tempPaladinLocation],
            neededActionInputs.tileInfo[movingTo],
            (tempPaladinLocation-movingTo),
            false,
            false // edge case

          )){
          let tempPaladinInfo = neededActionInputs.paladinInfo;
          tempPaladinInfo.paladinLoc = neededActionInputs.location;
          neededActionInputs.setPaladinInfo({
            ...tempPaladinInfo})
          // if where was clicked is already revealed then skip the rotate step
          if(neededActionInputs.tileInfo[neededActionInputs.location].value.facing == "up"){
            neededActionInputs.setActionInfo1("attack");
          }else{
            neededActionInputs.setActionInfo1("rotate");
            neededActionInputs.tileInfo[neededActionInputs.location].value.facing = "up";
            neededActionInputs.setTileInfo([...neededActionInputs.tileInfo]);
          }
          // need to add spend hero cube here
        }
      }
    }else if(neededActionInputs.action == "sprint"){
      if(neededActionInputs.actionInfo1 > 0){
        if(neededActionInputs.tileInfo[neededActionInputs.location].value.facing == "up"){
          if(
            AdjacentTiles(
              neededActionInputs.tileInfo[tempPaladinLocation],
              neededActionInputs.tileInfo[movingTo],
              (tempPaladinLocation-movingTo),
              false,
              false // edge case
            )){
            neededActionInputs.setActionInfo1(neededActionInputs.actionInfo1-1);
            paladin.move(neededActionInputs.gameID[0],neededActionInputs.location)
            // need to add spend hero cube here
            // need to add local move to speed up processing time
          }
        }
      }
    }
  }
}

const Tile = (props)=>{
  const rotation = props.tileRotation*90;
  const {currentUser} = useContext(AuthContext);
  const {gameInfo,setGameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2} = useContext(ActionContext);
  const {paladinInfo,setPaladinInfo} = useContext(PaladinContext);
  const {tileInfo,setTileInfo} =useContext(TileContext);
  const location = props.num;
  const NeededActionInputs = 
    {currentUser,
    gameInfo,
    setGameInfo,
    gameID,
    location,
    action,
    setAction,
    actionInfo1,
    setActionInfo1,
    actionInfo2,
    paladinInfo,
    setPaladinInfo,
    tileInfo,
    setTileInfo}
  return(
    <div className='tile' style={{backgroundImage: `url(${props.tilePic})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    transform: `rotate(${rotation}deg)`
    }}
    onClick={()=>handleBoardAction(NeededActionInputs)}>
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