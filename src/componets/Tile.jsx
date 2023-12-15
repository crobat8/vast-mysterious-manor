import React, { useContext } from 'react';
import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import {AdjacentTiles} from '../helperFunctions/Helpers'
import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { AuthContext } from '../context/AuthContext';
import { PaladinContext } from '../context/PaldinContext';
import { TileContext } from '../context/TileContext';

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

    function HandleBoardAction(location){
      // paladin tile actions
      if(currentUser.uid == gameInfo[0].roles.paladin){
        const tempPaladinLocation = paladinInfo.paladinLoc;
        const movingTo =  location;
        if( action == "crusade"){
          if( actionInfo1 == "move"){
            if(
              AdjacentTiles(
                 tileInfo[tempPaladinLocation],
                 tileInfo[movingTo],
                (tempPaladinLocation-movingTo),
                false,
                false // edge case
    
              )){
              let tempPaladinInfo =  paladinInfo;
              tempPaladinInfo.paladinLoc =  location;
               setPaladinInfo({
                ...tempPaladinInfo})
              // if where was clicked is already revealed then skip the rotate step
              if( tileInfo[location].value.facing == "up"){
                 setActionInfo1("attack");
              }else{
                 setActionInfo1("rotate");
                 tileInfo[ location].value.facing = "up";
                 setTileInfo([... tileInfo]);
              }
              // need to add spend hero cube here
            }
          }
        }else if( action == "sprint"){
          if( actionInfo1 > 0){
            if( tileInfo[ location].value.facing == "up"){
              if(
                AdjacentTiles(
                   tileInfo[tempPaladinLocation],
                   tileInfo[movingTo],
                  (tempPaladinLocation-movingTo),
                  false,
                  false // edge case
                )){
                 setActionInfo1( actionInfo1-1);
                paladin.move( gameID[0], location)
                // need to add spend hero cube here
                // need to add local move to speed up processing time
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