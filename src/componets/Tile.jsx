import React, { useContext } from 'react';
import general from '../playerFunctions/general';
import { GameContext } from '../context/GameContext';

function test(Id,loc){
  const spots = [loc]
  general.revealTile(Id[0],spots);
}

const Tile = (props)=>{
  const rotation = props.tileRotation*90;
  const {gameInfo,gameID} = useContext(GameContext);
  return(
    <div className='tile' style={{backgroundImage: `url(${props.tilePic})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    transform: `rotate(${rotation}deg)`
    }}
    onClick={()=>test(gameID,props.num)}>
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