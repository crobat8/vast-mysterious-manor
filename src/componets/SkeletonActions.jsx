import React, { useContext} from 'react';

import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';
import { SkeletonContext } from '../context/SkeletonContext';

import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import skeleton from '../playerFunctions/skeleton';

const EndPhase = (ID) =>{
  general.endPhase(ID[0]);
}

const IncreaseSkeletons = (ID) =>{
  skeleton.gainSkeleton(ID[0]);
  general.endPhase(ID[0]);
}

const GainSkeleton = () => {
  const {gameInfo,gameID} = useContext(GameContext);
  return(
    <div className="actions">

      <button onClick={()=>IncreaseSkeletons(gameID)}>
        gain a skeleton
      </button>
    </div>
  )
}

const endMarch = (ID) =>{
  
  skeleton.endMarch(ID[0]);
}

const EndMarchButton = () => {
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {skeletonInfo} = useContext(SkeletonContext);
  return(
    <div className="actions">
      <button onClick={()=>endMarch(gameID)}>
        end currentMarch
      </button>
    </div>
  )
}

const FinalChoices = () => {
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  return(
    <div className="actions">
      <button onClick={()=>EndPhase(gameID)}>
        end phase
      </button>
    </div>
  )
}

const ActionList1  = () =>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {skeletonInfo} = useContext(SkeletonContext);
  return(
    <div>
      <h3>
        loose stability for skeletons on lit tiles
      </h3>
      <FinalChoices/>
    </div>

  )
}

const ActionList2  = () =>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {skeletonInfo} = useContext(SkeletonContext);
  const currentMarchOrder = skeletonInfo.marchOrder
  console.log(skeletonInfo.currentSkeleton)
  console.log(currentMarchOrder.indexOf(skeletonInfo.currentSkeleton))
  console.log(skeletonInfo.skeletonsRevealed)
  return(
    <div>
      <h3>
        march order
      </h3>
      {skeletonInfo.marchOrder.indexOf(skeletonInfo.currentSkeleton)
      <skeletonInfo.skeletonsRevealed?
      <div>
        <h3>
          current up: {skeletonInfo.currentSkeleton}
        </h3>
        <h3>
          movesLeft: {skeletonInfo.movesLeft}
        </h3>
        <EndMarchButton/>
      </div>
      :
      <div>
        <h3>
          out of skeletons
        </h3>
      </div>

      }

      <FinalChoices/>
    </div>

  )
}

const ActionList3  = () =>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {skeletonInfo} = useContext(SkeletonContext);

  return(
    <div>
      <h3>
        spend 3 stability to gain a new skeleton 
      </h3>
      {
      skeletonInfo.stability >= 3?
      <GainSkeleton/>:
      <div/>
      }
      <FinalChoices/>
    </div>

  )
}

const ActionList4  = () =>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {skeletonInfo} = useContext(SkeletonContext);

  return(
    <div>
      <h3>
        gain 2 stability
      </h3>
      <FinalChoices/>
    </div>

  )
}

const SkeletonActions = () =>{ 
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {skeletonInfo} = useContext(SkeletonContext);

  if(!skeletonInfo){
    return(
      <h1>
        loading
      </h1>
    )
  }

  return (
    <div className="skeletonActionContainer">
      <h1>
        current actions 
      </h1>
      <h2>
        current phase: {gameInfo[0].phase}
      </h2>
      {gameInfo[0].phase == 1?
        <ActionList1/>:
        <div className='otherPlayers'></div>
      }
      {gameInfo[0].phase == 2?
        <ActionList2/>:
        <div className='otherPlayers'></div>
      }
      {gameInfo[0].phase == 3?
        <ActionList3/>:
        <div className='otherPlayers'></div>
      }
      {gameInfo[0].phase == 4?
        <ActionList4/>:
        <div className='otherPlayers'></div>
      }
    </div>
  )
}

export default SkeletonActions;