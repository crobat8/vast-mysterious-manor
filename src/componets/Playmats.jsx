import React, { useContext, useState,useEffect,memo } from 'react';
import {signOut} from "firebase/auth"
import { UserContext } from '../context/UserContext';
import FullGame from '../componets/FullGame';

import { auth, db, storage } from "../firebase";

import { collection, doc, query, setDoc, where, getDocs, deleteDoc,updateDoc,arrayRemove} from "firebase/firestore";
import { SearchingContext } from '../context/SearchingContext';
import { GameContext } from '../context/GameContext';

const Playmats = () =>{ 
  
  const{gameInfo} = useContext(GameContext);

  return (
    <div className="playmatContainer" >

    </div>
  )
}

export default Playmats;