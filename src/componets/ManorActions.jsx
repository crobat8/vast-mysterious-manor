import React, { useContext} from 'react';

import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';
import { ManorContext } from '../context/ManorContext';

import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import manor from '../playerFunctions/manor';
import e from 'cors';

const ManorActions = () =>{ 
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {manorInfo} = useContext(ManorContext);

  const EndPhase = () =>{
    general.endPhase(gameID[0]);
    clearActions();
  }
  
  const FinalChoices = () => {
    const {gameInfo,gameID} = useContext(GameContext);
    const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
    return(
      <div className="finale">
        <button onClick={()=>EndPhase()}>
          end phase
        </button>
      </div>
    )
  }

  function assignOmen(typeOfOmen){
    
    manor.assignOmen(gameID[0],typeOfOmen)
  }

  const ActionList1  = () =>{
    const {gameInfo,gameID} = useContext(GameContext);
    return(
      <div>
        <h3>
          choose where to put your omen cubes
        </h3>
        {manorInfo.omenCubes > 0?
        <div className="actions">
          {manorInfo.revealOmens.filter(item => item === "").length > 0?
            <button onClick={()=>assignOmen("reveal")}>
              Reaveal Tiles
            </button>:
            <>
            </>
          }
          {manorInfo.shiftOmens.filter(item => item === "").length > 0?
            <button onClick={()=>assignOmen("shift")}>
              Shift 1 Tile
            </button>:
            <>
            </>
          }
          {manorInfo.swapOmens.filter(item => item === "").length > 0?
            <button onClick={()=>assignOmen("swap")}>
              Swap 2 Tiles
            </button>:
            <>
            </>
          }
          {manorInfo.wallOmens.filter(item => item === "").length > 0?
            <button onClick={()=>assignOmen("wall")}>
              Place Walls
            </button>:
            <>
            </>
          }
          {manorInfo.moveOmens.filter(item => item === "").length > 0?
            <button onClick={()=>assignOmen("move")}>
              Move Wraith
            </button>:
            <>
            </>
          }
          {manorInfo.ritualOmens.filter(item => item === "").length > 0?
            <button onClick={()=>assignOmen("ritual")}>
              Draw More Rituals
            </button>:
            <>
            </>
          }
        </div>:
          <></>
        }
        <FinalChoices/>
      </div>
  
    )
  }
  
  const EndPowerButton = () => {
    const {gameInfo,gameID} = useContext(GameContext);
    return(
      <div className="finale">
        <button onClick={()=>manor.endPower(gameID[0])}>
          end power
        </button>
      </div>
    )
  }

  const ActionList2  = () =>{
    return(
      <div>
        {manorInfo.currentPower != ""?
        <div>
          <h3>
            use powers
          </h3>
          <h3>
            current power {manorInfo.currentPower}
          </h3>
          {manorInfo.currentPower == "reveal"
          ?
          <h3>
            tiles left to reveal: {manorInfo.revealTodo} 
          </h3>
          :manorInfo.currentPower == "shift"
          ?
          <h3>
            distance able to shift: {manorInfo.shiftTodo} 
          </h3>
          :manorInfo.currentPower == "swap"
          ?
          <h3>
            distance able to swap {manorInfo.swapTodo} 
          </h3>
          :manorInfo.currentPower == "wall"
          ?
          <h3>
            {manorInfo.wallTodo} walls left to place
          </h3>
          :manorInfo.currentPower == "move"
          ?
          <h3>
            {manorInfo.moveTodo} spaces left to move wraith
          </h3>
          :
          <>
          </>}
          <EndPowerButton/>
        </div>
        :
        <FinalChoices/>
        }
        
      </div>
  
    )
  }

  function submitRitual(cardInfo,pathInfo){
    // console.log("cardInfo",cardInfo);
    // console.log("pathInfo",pathInfo);
    manor.submitRitual(gameID[0],cardInfo,pathInfo);
    EndPhase(gameID,clearActions);
    general.addToken(gameID[0],pathInfo.ghostLocation,"ghost");
  }

  const ActionList3  = () =>{

    return(
      <div>
        {actionInfo1 == "" || actionInfo1 == null ?
          <div>
          </div>
          :
          <div>
            {actionInfo1.map((e,key)=>{
              const tempButtonNames = [
                "current Orientation",
                "rotated right",
                "flipped",
                "rotated left"
              ]
              if(e.playablePath){
                return(
                  <button onClick={()=>submitRitual(action,e)}>
                    {tempButtonNames[key]}
                  </button>
                )
              }
            })}
          </div>
        }

        
        <FinalChoices/>
      </div>
  
    )
  }
  
  const ActionList4  = () =>{
    return(
      <div>
        {manorInfo.treasuresToPlay > 0?
        <div>
          <h3>
            select a face down tile to add treasures to them
          </h3>
          <h3>
            you have {manorInfo.treasuresToPlay} treasures left to place
          </h3>
        </div>:
        <FinalChoices/>
        }
      </div>
    )
  }
  
  if(!manorInfo){
    return(
      <p>
        loading
      </p>
    )
  }

  return (
    <div className="manorActionContainer">
      
      <h1>
        current phase: {gameInfo[0].phase}
      </h1>
      {manorInfo.wraithLoc < 0?
        <h2>
          select a tile to put the wraith
        </h2>:
      gameInfo[0].phase == 1?
        <ActionList1/>:
      gameInfo[0].phase == 2?
        <ActionList2/>:
      gameInfo[0].phase == 3?
        <ActionList3/>:
      gameInfo[0].phase == 4?
        <ActionList4/>:
        <div className='otherPlayers'></div>
      } 
    </div>
  )
}

export default ManorActions;