import React, { useContext, useState,useEffect,memo } from 'react';
import {signOut} from "firebase/auth"
import { UserContext } from '../context/UserContext';
import FullGame from '../componets/FullGame';

import { auth, db, storage } from "../firebase";

import { collection, doc, query, setDoc, where, getDocs, deleteDoc,updateDoc,arrayRemove} from "firebase/firestore";
import { SearchingContext } from '../context/SearchingContext';
import { GameContext } from '../context/GameContext';

const gameInformation = () =>{ 
  
  const{gameInfo} = useContext(GameContext);

  
  console.log(gameInfo)
  if(gameInfo == null){
    return(
      <h1>
        not in a game right now
      </h1>
    )
  }
  return (
    <div className="Info" >
      
    </div>
  )
}

export default gameInformation;