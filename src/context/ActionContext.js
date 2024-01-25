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

  const clearActions = () =>{
    setAction(null);
    setActionInfo1(null);
    setActionInfo2(null);
  }

  return (
    <ActionContext.Provider value={{ 
      action,setAction,
      actionInfo1,setActionInfo1,
      actionInfo2,setActionInfo2,
      clearActions }}>
      {children}
    </ActionContext.Provider>
  );
};