import { createContext, useEffect, useState,useContext } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { GameContext } from "./GameContext";

export const TileContext = createContext();

export const TileContextProvider = ({ children }) => {
  const {gameInfo,gameID} = useContext(GameContext);
  const [tileInfo,setTileInfo]=useState(null)

  useEffect(() => {
    if(!gameID||gameID.length==0){
      return
    }
    const tileRef = collection(db,"games",gameID[0],"tilesCol")
    const unsub = onSnapshot(tileRef, snapshot =>{
      snapshot.forEach(doc => {
        var arrayOfTiles = Object.entries(doc.data()).map(([key, value], index) => ({ key, value }));
        setTileInfo(arrayOfTiles)
      });
    })

    return () => {
      unsub();
    };

  }, [gameID]);

  return (
    <TileContext.Provider value={{ tileInfo,setTileInfo }}>
      {children}
    </TileContext.Provider>
  );
};