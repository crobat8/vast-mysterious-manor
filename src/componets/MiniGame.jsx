import React, { useContext, useState,memo } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { GameContext } from '../context/GameContext';
import { UserContext } from '../context/UserContext';

const MiniGame = (props)=>{
  const {gameInfo} = useContext(GameContext);
  const{gameID} = useContext(GameContext);
  const {userInfo} = useContext(UserContext);

  const handlePlay = async(small)=>{
    if(gameInfo[0].function == "ready"){
      return 
    }
    const gameRef = doc(db,"games",gameID[0])
    let gameNum = "g" + props.big
    let miniGameInfo = gameInfo[0][gameNum]
    miniGameInfo[small] = gameInfo[0].turn
    await updateDoc(gameRef, {
      recentM: props.big,
      recentS: small,
      [gameNum]: miniGameInfo,
      function: "ready"
    });
  }
  console.log(props.result)
  if(props.winner == "X"){
    return(
      <div className='Xwinnerbackground'>
        <div className='Xwinner'>
          
        </div>
        
      </div>
    )
  }
  if(props.winner == "O"){
    return(
      <div className='Owinnerbackground'>
        <div className='Owinner'>

        </div>
      </div>
    )
  }

  return(
    <div className='miniGame'>
      {props.gameNum.map((e,i)=>{
        console.log(e)
        console.log(i)
        console.log(props)
        console.log(gameInfo[0])
        let playable;
        if(gameInfo[0].winnerM != ""){
          playable = false;
        }else if(gameInfo[0].mainGame[gameInfo[0].recentS] == "FULL"|| gameInfo[0].mainGame[gameInfo[0].recentS] == "X" ||gameInfo[0].mainGame[gameInfo[0].recentS] == "O"){
          if(gameInfo[0].mainGame[props.big] == "FULL"|| gameInfo[0].mainGame[props.big] == "X" ||gameInfo[0].mainGame[props.big] == "O"){
            playable = false;
          }else{
            playable = true;
          }
        }else if(gameInfo[0].recentS == props.big || gameInfo[0].recentS == 10 ){
          playable = true;
        }else{
          playable = false;
        }
        let myTurn

        if(gameInfo[0].first == userInfo[0].uid && gameInfo[0].turn == "X"){
          myTurn = true;
        }else if(gameInfo[0].second == userInfo[0].uid && gameInfo[0].turn == "O"){
          myTurn = true;
        }

        return(
          <div className='cellHolder'>
            {
              gameInfo[0].function == "done" && e == "" && playable && myTurn
              ?
              <div className={"cellP"} onClick={()=>handlePlay(i)} key={i}>
              {e}
              </div>
              :
              <div className={"cellD"} key={i} style={props.big==gameInfo[0].recentM&&i==gameInfo[0].recentS?{height:"30px",width:"30px",border: "thick solid #FFFFFF"}:{color: "white"}}>
              {e}
              </div>
            }
          </div>
          
          
        )
      })}
    </div>
  )
}

export default MiniGame;