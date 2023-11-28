import { createContext, useEffect, useState,useContext } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { 
  AuthContext 
} from "../context/AuthContext";

export const ActionContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [Action,setAction] = useState(null)
  const [ActionInfo1,setActionInfo1] = useState(null)

  return (
    <ActionContext.Provider value={{ Action,setAction,ActionInfo1,setActionInfo1 }}>
      {children}
    </ActionContext.Provider>
  );
};