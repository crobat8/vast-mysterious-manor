import React, { useContext } from 'react';
import general from '../playerFunctions/general';
import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { AuthContext } from '../context/AuthContext';
import { PaladinContext } from '../context/PaldinContext';

// function test(Id,loc,rot){
//   // id is game num
//   // loc is the tile num 
//   // rot is the rotation of the tile
//   const spots = [[loc,rot]]
//   general.revealTile(Id[0],spots);
// }

function handleBoardAction(neededActionInputs){
  // paladin tile actions
  if(neededActionInputs.currentUser.uid == neededActionInputs.gameInfo[0].roles.paladin){
    console.log("test1")
    if(neededActionInputs.action == "crusade"){
      console.log("test2")
      if(neededActionInputs.actionInfo1 == "0"){
        console.log("test3")
        let tempPaladinInfo = neededActionInputs.paladinInfo
        tempPaladinInfo.paladinLoc = neededActionInputs.location;
        neededActionInputs.setPaladinInfo({
          ...tempPaladinInfo})
        neededActionInputs.setActionInfo1(1);
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
    setPaladinInfo}
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