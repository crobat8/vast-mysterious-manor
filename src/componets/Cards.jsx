import React, { useContext, useState,useEffect,memo } from 'react';
import {signOut} from "firebase/auth"
import { UserContext } from '../context/UserContext';

import { auth, db, storage } from "../firebase";

import { collection, doc, query, setDoc, where, getDocs, deleteDoc,updateDoc,arrayRemove} from "firebase/firestore";
import { SearchingContext } from '../context/SearchingContext';
import { GameContext } from '../context/GameContext';
import PaladinActions from './PaladinActions';
import SkeletonActions from './SkeletonActions';
import SpiderActions from './SpiderActions';
import ManorActions from './ManorActions';
import SpiderCards from './SpiderCards';
import SkeletonCards from './SkeletonCards';

const Cards = () =>{ 
  
  const{gameInfo} = useContext(GameContext);
  const{userInfo} =useContext(UserContext);

  if(gameInfo == null||gameInfo.length == 0){
    return(
      <div className='Board'>
        loading game actions
      </div>
    )
  }
  if(userInfo == null||userInfo.length == 0){
    return(
      <div className='Board'>
        loading game actions
      </div>
    )
  }
  return ( 
    <div className="cardContainer" >
      
      {gameInfo[0].roles.paladin == userInfo[0].uid?
        <p>
          card area need to be paladin cards later
        </p>:
        <div className='otherPlayers'></div>
      }
      {gameInfo[0].roles.skeleton == userInfo[0].uid?
        <p>
          <SkeletonCards/>
        </p>:
        <div className='otherPlayers'></div>
      }
      {gameInfo[0].roles.spider == userInfo[0].uid?
        <SpiderCards/>:
        <div className='otherPlayers'></div>
      }
      {gameInfo[0].roles.manor == userInfo[0].uid?
        <p>
          card area need to be manor cards later
        </p>:
        <div className='otherPlayers'></div>
      }
      
    </div>
  )
}

export default Cards;