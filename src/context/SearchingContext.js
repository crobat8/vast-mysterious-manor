import { createContext, useEffect, useState,useContext } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { AuthContext } from "../context/AuthContext";
import { UserContext } from '../context/UserContext';

export const SearchingContext = createContext();

export const SearchingContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const {userInfo} =useContext(UserContext);
  const [SearchInfo,setSearchInfo]=useState(null)
  const [loading,setLoading]=useState(true)
  
  useEffect(() => {
    if(!currentUser){
      return
    }
    if(!userInfo){
      return
    }
    const userRef =query(collection(db,"searching"),where("uid","==",userInfo[0].uid)) 
    const unsub = onSnapshot(userRef,(snapshot)=>{
      setSearchInfo(snapshot.docs.map(doc=>doc.data()))
    })
    
    return () => {
      unsub();
    };

  }, [currentUser,userInfo]);

  return (
    <SearchingContext.Provider value={{ SearchInfo }}>
      {children}
    </SearchingContext.Provider>
  );
};