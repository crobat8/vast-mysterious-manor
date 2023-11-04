import React from 'react';


const Tile = (props)=>{
  const rotation = props.tileRotation*90;
  return(
    <div className='tile'>
      <img src={props.tilePic} style={{transform: `rotate(${rotation}deg)`}}/>
    </div>
  )
}

export default Tile;