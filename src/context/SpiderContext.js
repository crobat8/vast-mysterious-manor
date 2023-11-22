import { createContext, useEffect, useState,useContext } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { GameContext } from "./GameContext";

export const SpiderContext = createContext();

export const SpiderContextProvider = ({ children }) => {
  const {gameInfo,gameID} = useContext(GameContext);
  const [spiderInfo,setSpiderInfo]=useState(null)

  useEffect(() => {
    if(!gameID||gameID.length==0){
      return
    }
    const tileRef = collection(db,"games",gameID[0],"spiderCol")
    const unsub = onSnapshot(tileRef, snapshot =>{
      snapshot.forEach(doc => {

        setSpiderInfo(doc.data())
      });
    })

    return () => {
      unsub();
    };

  }, [gameID]);

  return (
    <SpiderContext.Provider value={{ spiderInfo }}>
      {children}
    </SpiderContext.Provider>
  );
};