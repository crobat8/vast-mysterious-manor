import { createContext, useEffect, useState,useContext } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { 
  AuthContext 
} from "../context/AuthContext";

export const ActionContext = createContext();

export const ActionContextProvider = ({ children }) => {
  const [Action,setAction] = useState(null);
  const [ActionInfo1,setActionInfo1] = useState(null);
  const [ActionInfo2,setActionInfo2] = useState(null);

  const clearActions = () =>{
    setAction(null);
    setActionInfo1(null)
    setActionInfo2(null)
  }

  return (
    <ActionContext.Provider value={{ 
      Action,setAction,
      ActionInfo1,setActionInfo1,
      ActionInfo2,setActionInfo2,
      clearActions }}>
      {children}
    </ActionContext.Provider>
  );
};