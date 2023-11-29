import { createContext, useEffect, useState,useContext } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { GameContext } from "./GameContext";

export const PaladinContext = createContext();

export const PaladinContextProvider = ({ children }) => {
  const {gameInfo,gameID} = useContext(GameContext);
  const [paladinInfo,setPaladinInfo]=useState(null)

  useEffect(() => {
    if(!gameID||gameID.length==0){
      return
    }
    const tileRef = collection(db,"games",gameID[0],"paladinCol")
    const unsub = onSnapshot(tileRef, snapshot =>{
      snapshot.forEach(doc => {
        setPaladinInfo(doc.data())
      });
    })

    return () => {
      unsub();
    };

  }, [gameID]);

  return (
    <PaladinContext.Provider value={{ paladinInfo,setPaladinInfo}}>
      {children}
    </PaladinContext.Provider>
  );
};