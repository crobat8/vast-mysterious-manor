import { createContext, useEffect, useState,useContext } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { GameContext } from "./GameContext";

export const ManorContext = createContext();

export const ManorContextProvider = ({ children }) => {
  const {gameInfo,gameID} = useContext(GameContext);
  const [manorInfo,setManorInfo]=useState(null)

  useEffect(() => {
    if(!gameID||gameID.length==0){
      return
    }
    const tileRef = collection(db,"games",gameID[0],"manorCol")
    const unsub = onSnapshot(tileRef, snapshot =>{
      snapshot.forEach(doc => {

        setManorInfo(doc.data())
      });
    })

    return () => {
      unsub();
    };

  }, [gameID]);

  return (
    <ManorContext.Provider value={{ manorInfo }}>
      {children}
    </ManorContext.Provider>
  );
};