import React, { useContext, useState,useEffect,memo } from 'react';
import {signOut} from "firebase/auth"
import { UserContext } from '../context/UserContext';

import { auth, db, storage } from "../firebase";

import { collection, doc, query, setDoc, where, getDocs, deleteDoc,updateDoc,arrayRemove} from "firebase/firestore";
import { SearchingContext } from '../context/SearchingContext';
import { GameContext } from '../context/GameContext';
import paladin from '../playerFunctions/paladin';
import { ActionContext } from '../context/ActionContext';

function prepare (ID){
  paladin.prep(ID);
}

function crusade (settingAction,settingActionInfo1){
  settingAction("crusade");
  //this is the step of the crusade the user is on
  settingActionInfo1(0)
}

function sprint (settingAction,settingActionInfo1){
  settingAction("sprint");
  // this is how many spaces the player can move 
  settingActionInfo1(2)
}

function cancel(clear) {
  clear();
}

const PaladinActions = () =>{ 
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  return (
    <div className="paladinActionContainer">
        
      <h1>
        current actions
      </h1>
      <div className="actions">
        <button onClick={()=>prepare(gameID)}>
          prepare
        </button>
        <button onClick={()=>crusade(setAction,setActionInfo1)}>
          cursade
        </button>
        <button onClick={()=>sprint(setAction,setActionInfo1)}>
          sprint
        </button>
        {/* <button onClick={()=>cancel(clearActions)}>
          cancel Action
        </button> */}
        <button>
          end phase
        </button>
      </div>
      <p>
        {action}
      </p>
      <p>
        {actionInfo1}
      </p>
    </div>
  )
}

export default PaladinActions;