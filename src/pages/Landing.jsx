import React, { useState } from 'react';

import Login from "../componets/Login";
import Register from "../componets/Register";
import ReactCardFlip from "react-card-flip";
import ResetPassword from '../componets/ResetPassword';
import vastCover from '../img/vast_cover_art.png'
import vastChart from '../img/vast_manor_chart.png'
import Pill from '../componets/Pill';
import FadeIn from 'react-fade-in';

const Landing = () =>{ 
  const [slide,setSlide] = useState(1)
  const pillInfo = [
    {
      title:"online",
      description:"play with your friends or random people online in this web app version of vast the mysterious manor",
      pic:vastCover,
      color:"#dac2bb"
    },
    {
      title:"paladin",
      description:"You were tasked with killing the evil giant spider who is currently living in the old manor up the road from the local town. Hunt and kill the spider to win.",
      pic:vastChart,
      color:"#d9c663"
    },
    {
      title:"skeletons",
      description:"As the evil undead from the family graveyard you feel attacked having an intuder in your old family home. hunt down and kill the paladin by statigically placing your skeletons to gang up on them and win.",
      pic:vastChart,
      color:"#88a378"
    },
    {
      title:"spider",
      description:"the old spider that has been cursed to stay in this manor forever has finally had enough and wants to escape. Terrorize everyone to break the curse and esacape to win.",
      pic:vastChart,
      color:"#cd5d75"
    },
    {
      title:"manor",
      description:"as the spirit of the manor you need to complete omens to release your self and keep everyone else locked in. To win you must complete rituals to lock down the manor forever.",
      pic:vastChart,
      color:"#673170"
    },
    {
      title:"warlock",
      description:"you snuck in right behind the paladin for your own gains of potentially getting magic from the mansion. complete netowrks of poltergiests to be able to win the game.",
      pic:vastChart,
      color:"#94aca6"
    },
  ]
  function HandleSwap(){
    
    if(slide === 1){
      return (
      <FadeIn className='fade'>
        <Login change={changeSlide}/>
      </FadeIn>
      )
      
    }else if(slide === 2){
      return(
        <FadeIn className='fade'>
          <ResetPassword change={changeSlide}/>
        </FadeIn>
      ) 
    }else if(slide === 3){
      return (
        <FadeIn className='fade'>
          <Register change={changeSlide}/>
        </FadeIn>
      ) 
    }
  }
  const changeSlide = (x) =>{
    setSlide(x)
    
  }

  return (
    <div className="landing">
      
      <header className="topBar" >
        
        <div className='title'>
          <h1>
            Vast Mysterious Manor  
          </h1>
          <p>
            Play Online
          </p>
        </div>
        
      </header>
      <main >
        <FadeIn delay={100}>
          <div className='focus'> 
            
            <HandleSwap/>
            
          </div>
          
          <div className='pills'>
            
              {pillInfo.map((e,i)=>{
                return(
                  <Pill data={e} count={i}/>
                )
                
              })}
            
          </div>
        </FadeIn>
      </main>
      
      
      <footer className='botBar'>
      </footer>
    </div>
  )
}

export default Landing;