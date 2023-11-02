import React from "react";

const Pill = (props) =>{
  const borderInfo = "5px solid "+props.data.color
  if(props.count%2==0){
    
    return(
      <article className="pill" style={{border: borderInfo}}>
        <div className="text" style={{backgroundColor:props.data.color}}>
          <h2>
            {props.data.title}
          </h2>
          <p>
            {props.data.description}
          </p>
        </div>
        <div className="picture">
          <img src={props.data.pic} alt=""/>
        </div>
      </article>
    )
  }else{
    return(
      <article className="pill" style={{border: borderInfo}}>
        <div className="picture">
          <img src={props.data.pic} alt=""/>
        </div>
        <div className="text" style={{backgroundColor:props.data.color}}>
          <h2>
            {props.data.title}
          </h2>
          <p>
            {props.data.description}
          </p>
        </div>
      </article>
    )
  }

}
export default Pill;