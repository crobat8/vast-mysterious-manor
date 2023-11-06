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
        <div className='characters'>
          {props.characterIcons.map((e)=>{
            return(
              <img src={e}/>
            )
          })}
        </div>
        <div className='tokens'>
        {props.tokenIcons.map((e)=>{
            return(
              <img src={e}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Tile;