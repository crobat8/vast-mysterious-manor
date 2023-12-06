import React, { useContext } from 'react';
import general from '../playerFunctions/general';
import {AdjacentTiles} from '../helperFunctions/Helpers'
import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { AuthContext } from '../context/AuthContext';
import { PaladinContext } from '../context/PaldinContext';
import { TileContext } from '../context/TileContext';

const handleBoardAction = (neededActionInputs)=>{
  // paladin tile actions
  console.log("test1");
  if(neededActionInputs.currentUser.uid == neededActionInputs.gameInfo[0].roles.paladin){
    const tempPaladinLocation =neededActionInputs.paladinInfo.paladinLoc;
    const movingTo = neededActionInputs.location;
    console.log("test2");
    if(neededActionInputs.action == "crusade"){
      console.log("test3");
      if(neededActionInputs.actionInfo1 == "move"){
        console.log("test4");
        let direct; 
        if(
          AdjacentTiles(
            neededActionInputs.tileInfo[tempPaladinLocation],
            neededActionInputs.tileInfo[movingTo],
            (tempPaladinLocation-movingTo),
            false
          )){
          console.log("test5");
          console.log(neededActionInputs.paladinInfo.paladinLoc,neededActionInputs.location,false);
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