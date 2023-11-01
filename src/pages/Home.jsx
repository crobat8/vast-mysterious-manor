import React, { useContext, useState,useEffect,memo } from 'react';
import {signOut} from "firebase/auth"
import { UserContext } from '../context/UserContext';
import FullGame from '../componets/FullGame';

import { auth, db, storage } from "../firebase";

import { collection, doc, query, setDoc, where, getDocs, deleteDoc,updateDoc,arrayRemove} from "firebase/firestore";
import { SearchingContext } from '../context/SearchingContext';
import { GameContext } from '../context/GameContext';

const Home = () =>{ 
  
  const{userInfo} =useContext(UserContext);
  const{SearchInfo} = useContext(SearchingContext)
  const{gameInfo} = useContext(GameContext);
  const{gameID} = useContext(GameContext);
  const[mode,setMode]=useState("Online")
  const handleGameMode = async (e,x) =>{

    setMode(x)
    if(x == 'Online'){
      // remove self from game
      // assign winner
      // add self to searching
      if(gameInfo.length == 0){
        // not in a game
      }else{
        // in a game
        const activeRef = doc(db,"games",gameID[0])
        //remove self from active players in the game
        await updateDoc(activeRef, {
          activePlayers: arrayRemove(userInfo[0].uid),
        });         
        // check to see if there is a winner
        // if not set the winner of the current game
        // to the other person
        if(gameInfo[0].winnerM == ""){

          let otherPlayer = "X";
          if(gameInfo[0].first == userInfo[0].uid){
            otherPlayer = "O"

          }else{

          }

          await updateDoc(activeRef, {
            winnerM: otherPlayer,
          });
        }
      }
      await setDoc(doc(db,"searching",userInfo[0].uid), {
        uid:userInfo[0].uid,
        mmr:userInfo[0].mmr
      });
    }
  }

  function Icon()  {
    try {
      return(
        <div>
          <h2>
            you are {gameInfo[0].first == userInfo[0].uid?"X":"O"} this game
          </h2>
        </div>
      )
    } catch (error) {
      // console.log(error) 
    }
  }

  if(!userInfo){
    return(
      <h1>
        Loading user Info
      </h1>
    )
  }
  return (
    <div className="home" >
      <header className='topBar'>
        <div>
          
          <p>
            name: {userInfo[0].displayName}
          </p>
          <p>
            mmr: {userInfo[0].mmr}
          </p>
          <button onClick={()=>signOut(auth)}> 
            logout
          </button>
        </div>
        <div>
          <h1>
            Super TicTacToe 
          </h1>
        </div>
        <div>
          
        </div>
      </header>
      <main>
        <div className='placeHolder'></div>
        <div className='gameHolder'>
          <div className='resetHolder'>
            <div>

            </div>
            <button onClick={(e)=>handleGameMode(e,"Online")}>
              new online game
            </button>
            <div>
              <Icon/>
            </div>
          </div>
          {/* {mode} */}
          <FullGame/>
          
        </div>
        <div className='placeHolder'></div>
      </main>
      <footer>
        
      </footer>
    </div>
  )
}

export default Home;