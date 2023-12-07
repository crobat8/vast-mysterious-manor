import React, { useContext, useState,useEffect,memo } from 'react';
import {signOut} from "firebase/auth"
import { UserContext } from '../context/UserContext';
import FullGame from '../componets/FullGame';

import { auth, db, storage } from "../firebase";

import { collection, doc, query, setDoc, where, getDocs, deleteDoc,updateDoc,arrayRemove} from "firebase/firestore";
import { SearchingContext } from '../context/SearchingContext';
import { GameContext } from '../context/GameContext';
import Playmats from '../componets/Playmats';
import GameInformation from '../componets/GameInformation';

const Home = () =>{ 
  
  const{userInfo} =useContext(UserContext);
  const{gameInfo} = useContext(GameContext);
  const{gameID} = useContext(GameContext);
  const[mode,setMode]=useState("Online")

  const handleGameMode = async (e,x) =>{
    if(gameInfo.length == 0){
      // not in a game
      await setDoc(doc(db,"searching",userInfo[0].uid), {
        uid:userInfo[0].uid,
        role:x,
      });
    }else{
      // in a game
      const activeRef = doc(db,"games",gameID[0])
      //remove self from active players in the game
      await updateDoc(activeRef, {
        activePlayers: arrayRemove(userInfo[0].uid),
      }).then(async()=>{
        await setDoc(doc(db,"searching",userInfo[0].uid), {
          uid:userInfo[0].uid,
          role:x,
        });
      });         

    }
  }

  const findKey = () => {
    for (const key in gameInfo[0].roles) {
      if (gameInfo[0].roles[key] === userInfo[0].uid) {
        return key;
      }
    }
    return null; // Return null if no match is found
  };

  function UserCorner()  {
    try {
      return(
        <div>
          <p>
            name: {userInfo[0].displayName}
          </p>
          <p> 
            my role: {findKey()}
          </p>
          <button onClick={()=>signOut(auth)}> 
            logout
          </button>
        </div>
      )
    } catch (error) {
      return(
        <div>
          <p>
            name: loading
          </p>
          <p>
            mmr: loading
          </p>
          <button onClick={()=>signOut(auth)}> 
            logout
          </button>
        </div>
      )
    }
  }

  return (
    <div className="home" >
      <header className='topBar'>
        <div className='userInfo'>
          <UserCorner/>
        </div>
        <div className='title'>
          <h1>
            Vast Mysterious Manner
          </h1>
        </div>
        <div className='roleSelection'>
          <button onClick={(e)=>handleGameMode(e,"paladin")}>
            new game as Paladin
          </button>
          <button onClick={(e)=>handleGameMode(e,"skeleton")}>
            new game as Skeleton
          </button>
          <button onClick={(e)=>handleGameMode(e,"spider")}>
            new game as Spider
          </button>
          <button onClick={(e)=>handleGameMode(e,"manor")}>
            new game as Manor
          </button>
          {/* <button onClick={(e)=>handleGameMode(e,"Warlock")}>
            new game as Warlock
          </button> */}
        </div>
      </header>
      <main>
        
        <div className='gameInformation'>
          <GameInformation/>
        </div>
        <div className='gameBoard'>
          <FullGame/>
        </div>
        <div className='playMats'>
           <Playmats/>
        </div>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default Home;