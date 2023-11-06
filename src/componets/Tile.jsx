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