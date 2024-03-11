import React, { useContext} from 'react';

import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';
import { ManorContext } from '../context/ManorContext';

import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import manor from '../playerFunctions/manor';

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
        <button onClick={()=>EndPhase(gameID,clearActions)}>
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
    const {gameInfo,gameID} = useContext(GameContext);
    const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
    console.log(manorInfo)
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

  // const ActionList3  = () =>{
  //   const {gameInfo,gameID} = useContext(GameContext);
  //   const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,actionUses,clearActions} = useContext(ActionContext)
  //   const {spiderInfo} = useContext(SpiderContext);
  
  //   return(
  //     <div>
  //       <h3>
  //         select an action to take or click a piece to move it
  //       </h3>
  //       {action == "move"
  //       ?
  //       <div>
  //         <h4>
  //           select a tile to move to
  //           {/* display the options for this */}
  //         </h4>
  //         <FinshMovement/>
  //       </div>
  
  //       :actionInfo2 == "rotate"
  //       ?
  //       <RotateChoices/>
  //       :actionInfo1 != null
  //       ?
  //       <div>
  //         <h4>
  //           select a tile to do {action} on 
  //           {/* display the options for this */}
  //         </h4>
  //         {spiderInfo.form == "spiderling"
  //         ?
  //         <h5>
  //           you can do it {spiderlingActionsLeft()} more times
  //         </h5>
  //         :
  //         <h5>
  //           you can do it {actionUses} more times
  //         </h5>
  //         }

  //         {(spiderInfo.form == "giantSpider" && actionUses == 1)
  //         ||(spiderInfo.form == "spiderling" && spiderlingActionsLeft()>0 && action != "loot")
  //         ?
  //           <div>
  //             <button onClick={()=>skipExtraUse(gameID,actionInfo1,clearActions)}>
  //               skip extra uses
  //             </button>
  //           </div>
  //         :
  //         <>
  //         </>
  //         }
  //         {action == "loot" && spiderlingActionsLeft() > 0 
  //         ?
  //         <div>
  //           <p>
  //             {actionInfo2}
  //           </p>
  //           <button onClick={()=>finishLoot()}>
  //             finish loot
  //           </button>
  //         </div>
  //         :
  //         <>
  //         </>
  //         }
  //       </div>
  
  //       :action != null 
  //       ?
  //       <h4>
  //         select a card to use for {action}
  //         {/* display the options for this */}
  //       </h4>
  //       :spiderInfo.spellCards.length >= 1
  //       ?
  //         <div className="actions">
  //           {spiderInfo.spellCards.includes("eyes") 
  //           || spiderInfo.form == "caster"
  //           ?
  //           <button onClick={()=>phase3Action(gameID,"eyes",setAction)}>
  //             eyes
  //           </button>
  //           :
  //           <div/>
  //           }
  
  //           {spiderInfo.spellCards.includes("fangs") 
  //           || spiderInfo.form == "giantSpider"
  //           ?
  //           <button onClick={()=>phase3Action(gameID,"fangs",setAction)}>
  //             fangs
  //           </button>
  //           :
  //           <div/>
  //           }
  
  //           {spiderInfo.spellCards.includes("webs") 
  //           || spiderInfo.form == "spiderling"
  //           ?
  //           <button onClick={()=>phase3Action(gameID,"webs",setAction)}>
  //             webs
  //           </button>
  //           :
  //           <div/>
  //           }
  
  //           {spiderInfo.form == "caster"
  //           ?
  //           <button onClick={()=>phase3Action(gameID,"veil",setAction)}>
  //             veil
  //           </button>
  //           :
  //           <div/>
  //           }
  
  //           {spiderInfo.blood >= 1
  //           &&  spiderInfo.form == "caster"
  //           ?
  //           <button onClick={()=>phase3Action(gameID,"tend",setAction)}>
  //             tend
  //           </button>
  //           :
  //           <div/>
  //           }
  
  //           {spiderInfo.form == "giantSpider"
  //           ?
  //           <button onClick={()=>phase3Action(gameID,"layEgg",setAction)}>
  //             lay Egg
  //           </button>
  //           :
  //           <div/>
  //           }
  
  //           {/* <button onClick={()=>phase3Action(gameID,"legs",setAction)}>
  //             legs
  //           </button> */}
            
  //           {spiderInfo.form == "spiderling"
  //           ?
  //           <button onClick={()=>phase3Action(gameID,"loot",setAction)}>
  //             loot
  //           </button>
  //           :
  //           <div/>
  //           }
  //         </div>
  //       :spiderInfo.blood >= 1
  //         &&  spiderInfo.form == "caster"
  //       ?
  //         <div className="actions">
  //           <button onClick={()=>tend()}>
  //             tend
  //           </button>
  //         </div>
  //       :
  //         <div/>
  //       }
        
  //       <FinalChoices/>
  //       {/* need to iron things out before 100% adding this */}
  //       {/* <CancelChoice/> */}
  //     </div>
  
  //   )
  // }
  
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
        <FinalChoices/>:
      gameInfo[0].phase == 4?
        <ActionList4/>:
        <div className='otherPlayers'></div>
      } 
    </div>
  )
}

export default ManorActions;