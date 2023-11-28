import React, { useContext } from 'react';
import general from '../playerFunctions/general';
import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';

function test(Id,loc,rot){
  // id is game num
  // loc is the tile num 
  // rot is the rotation of the tile
  const spots = [[loc,rot]]
  general.revealTile(Id[0],spots);
}

function handleAction(action){
  console.log(action)
}

const Tile = (props)=>{
  const rotation = props.tileRotation*90;
  const {gameInfo,gameID} = useContext(GameContext);
  const {Action} =useContext(ActionContext)

  return(
    <div className='tile' style={{backgroundImage: `url(${props.tilePic})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    transform: `rotate(${rotation}deg)`
    }}
    //props num is location of the tile  //()=>test(gameID,props.num,3)
    onClick={()=>handleAction(Action)}>
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