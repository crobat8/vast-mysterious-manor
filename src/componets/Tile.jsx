import React from 'react';


const Tile = (props)=>{
  const rotation = props.tileRotation*90;
  return(
    <div className='tile' style={{backgroundImage: `url(${props.tilePic})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    transform: `rotate(${rotation}deg)`
    }}>
      <div className='pieceContainer' style={{transform: `rotate(${-rotation}deg)`}}>
        <p >
          test is this up right
        </p>
      </div>
    </div>
  )
}

export default Tile;