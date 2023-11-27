import React, { useContext, useState,useEffect,memo } from 'react';
import {signOut} from "firebase/auth"
import { UserContext } from '../context/UserContext';

import { auth, db, storage } from "../firebase";

import { collection, doc, query, setDoc, where, getDocs, deleteDoc,updateDoc,arrayRemove} from "firebase/firestore";
import { SearchingContext } from '../context/SearchingContext';
import { GameContext } from '../context/GameContext';
import PaladinActions from './PaladinActions';

const Playmats = () =>{ 
  
  const{gameInfo} = useContext(GameContext);
  const{userInfo} =useContext(UserContext);

  if(gameInfo == null||gameInfo.length == 0){
    return(
      <div className='Board'>
        loading game actions
      </div>
    )
  }
  return (
    <div className="playmatContainer" >
      
      {gameInfo[0].roles.paladin == userInfo[0].uid ?
        <PaladinActions/>:
        <div className='otherPlayers'></div>
      }
        
      
    </div>
  )
}

export default Playmats;