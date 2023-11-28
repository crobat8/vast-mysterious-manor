import React, { useContext, useState,useEffect,memo } from 'react';
import {signOut} from "firebase/auth"
import { UserContext } from '../context/UserContext';

import { auth, db, storage } from "../firebase";

import { collection, doc, query, setDoc, where, getDocs, deleteDoc,updateDoc,arrayRemove} from "firebase/firestore";
import { SearchingContext } from '../context/SearchingContext';
import { GameContext } from '../context/GameContext';
import paladin from '../playerFunctions/paladin';

function prepare (ID){

  paladin.prep(ID);

}

const PaladinActions = () =>{ 
  const {gameInfo,gameID} = useContext(GameContext);
  return (
    <div className="paladinActionContainer">
        
      <h1>
        current actions
      </h1>
      <div className="actions">
        <button onClick={()=>prepare(gameID)}>
          prepare
        </button>
        <button>
          cursade
        </button>
        <button>
          sprint
        </button>
        <button>
          end phase
        </button>
      </div>
    </div>
  )
}

export default PaladinActions;