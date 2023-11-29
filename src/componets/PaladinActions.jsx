import React, { useContext, useState,useEffect,memo } from 'react';
import {signOut} from "firebase/auth"
import { UserContext } from '../context/UserContext';

import { auth, db, storage } from "../firebase";

import { collection, doc, query, setDoc, where, getDocs, deleteDoc,updateDoc,arrayRemove} from "firebase/firestore";
import { SearchingContext } from '../context/SearchingContext';
import { GameContext } from '../context/GameContext';
import paladin from '../playerFunctions/paladin';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';
import general from '../playerFunctions/general';

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

const ConfirmCrusadeRotation = (ID,Loc,Rot,setActionInfo1)=>{
  console.log(Loc,Rot,ID)
  const spots = [[Loc,Rot]]
  general.revealTile(ID[0],spots);
  //next is to add a move paladin function to the cloud
  setActionInfo1("2");
}

const InitialChoices = ()=>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {paladinInfo} = useContext(PaladinContext);
  return(
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
      <button onClick={()=>cancel(clearActions)}>
        cancel Action
      </button> 
      <button>
        end phase
      </button>
    </div>
  )
}

const RotateChoices = ()=>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,clearActions} = useContext(ActionContext)
  const {paladinInfo} = useContext(PaladinContext);
  console.log(paladinInfo)
  return(
    <div className="actions">
      <div>
        choose an oriantation of the tile you moved to
      </div>
      <div>
        <button onClick={()=>setActionInfo2(0)}>
          North
        </button>
        <button onClick={()=>setActionInfo2(1)}>
          East
        </button>
        <button onClick={()=>setActionInfo2(2)}>
          South
        </button>
        <button onClick={()=>setActionInfo2(3)}>
          West
        </button> 
        <button onClick={()=>ConfirmCrusadeRotation(gameID,paladinInfo.paladinLoc,actionInfo2,setActionInfo1)}>
          confirm oriantation
        </button>
      </div>

    </div>
  )
}

const ActionList  = () =>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  if(action == "crusade"&&actionInfo1 == 0){
    return(
      <p>
        select a tile to crusade into
      </p>
    )
  }else if(action == "crusade"&&actionInfo1 == 1){
    return(
      <RotateChoices/>
    )
  }else{
    return(
      <InitialChoices/>
    )
  }
}

const PaladinActions = () =>{ 
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)

  return (
    <div className="paladinActionContainer">
        
      <h1>
        current actions
      </h1>
      <ActionList/>
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