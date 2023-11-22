import { createContext, useEffect, useState,useContext } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { GameContext } from "./GameContext";

export const SkeletonContext = createContext();

export const SkeletonContextProvider = ({ children }) => {
  const {gameInfo,gameID} = useContext(GameContext);
  const [skeletonInfo,setSkeletonInfo]=useState(null)

  useEffect(() => {
    if(!gameID||gameID.length==0){
      return
    }
    const tileRef = collection(db,"games",gameID[0],"skeletonCol")
    const unsub = onSnapshot(tileRef, snapshot =>{
      snapshot.forEach(doc => {
        setSkeletonInfo(doc.data())
      });
    })

    return () => {
      unsub();
    };

  }, [gameID]);

  return (
    <SkeletonContext.Provider value={{ skeletonInfo }}>
      {children}
    </SkeletonContext.Provider>
  );
};