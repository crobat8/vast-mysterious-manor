import React, { useState } from 'react';

import Login from "../componets/Login";
import Register from "../componets/Register";
import ReactCardFlip from "react-card-flip";
import ResetPassword from '../componets/ResetPassword';
import background from '../img/home_banner_edit.png'
import RedLogo from '../img/CWU_wildcat_spirit_mark_RGB.png'
import Pill from '../componets/Pill';
import FadeIn from 'react-fade-in';

const Landing = () =>{ 
  const [slide,setSlide] = useState(1)
  const pillInfo = [
    {
      title:"Online",
      description:"play Tic Tac Toe online with random people in your skill range.",
      pic:RedLogo
    },
    {
      title:"how to win",
      description:"to win you must get 3 in a row on the big board or the majority of the games won.",
      pic:RedLogo
    },
    {
      title:"how to play pt. 1",
      description:"what area you play in within a small square determines where your opponet must play in the main game.",
      pic:RedLogo
    },
    
    {
      title:"how to play pt. 2",
      description:"once a game is won or full no one can play in it anymore, any forced plays in that area result in a free play anywhere",
      pic:RedLogo
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
            Super TicTacToe  
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