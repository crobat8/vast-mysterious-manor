import { createContext, useEffect, useState,useContext } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { 
  AuthContext 
} from "../context/AuthContext";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [gameInfo,setGameInfo]=useState(null)
  const [gameID,setGameID] = useState(null)
  const [loading,setLoading]=useState(true)
  
  useEffect(() => {
    if(!currentUser){
      return
    }
    const userRef = query(collection(db,"games"),where("activePlayers","array-contains",currentUser.uid)) 
    const unsub = onSnapshot(userRef,(snapshot)=>{
      setGameInfo(snapshot.docs.map(doc=>doc.data()))
      setGameID(snapshot.docs.map(doc=>doc.id))
    })
    return () => {
      unsub();
    };

  }, [currentUser]);

  return (
    <GameContext.Provider value={{ gameInfo,gameID }}>
      {children}
    </GameContext.Provider>
  );
};