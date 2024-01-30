import { createContext, useEffect, useState,useContext } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { 
  AuthContext 
} from "../context/AuthContext";

export const ActionContext = createContext();

export const ActionContextProvider = ({ children }) => {
  
  const [action,setAction] = useState(null);
  // action info can be used by different players 
  //to do different actions on different turns
  const [actionInfo1,setActionInfo1] = useState(null);
  const [actionInfo2,setActionInfo2] = useState(null);
  const [actionInfo3,setActionInfo3] = useState(null);
  const [actionInfo4,setActionInfo4] = useState(null);

  const clearActions = () =>{
    setAction(null);
    setActionInfo1(null);
    setActionInfo2(null);
    setActionInfo3(null);
    setActionInfo4(null);
  }

  return (
    <ActionContext.Provider value={{ 
      action,setAction,
      actionInfo1,setActionInfo1,
      actionInfo2,setActionInfo2,
      actionInfo3,setActionInfo3,
      actionInfo4,setActionInfo4,
      clearActions }}>
      {children}
    </ActionContext.Provider>
  );
};
//used for local changes prior to sending to server
//paladin
//phase 2
// action what you are doing ex crusade
// actioninfo1 what part of crusade you are on
// action info2 rotation of reveled tile
//spider
// phase 3
// action what action you are making
// actioninfo1 the card used for the action
// actioninfo2 if tile needs to be rotated
// actioninfo3 where the tile is
// actioninfo4 local rotation of tile