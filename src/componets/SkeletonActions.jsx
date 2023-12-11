import React, { useContext} from 'react';

import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';
import { SkeletonContext } from '../context/SkeletonContext';

import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';


const EndPhase = (ID) =>{
  general.endPhase(ID[0]);
}

const increaseSkeletons = (ID) =>{
  
}

const GainSkeleton = () => {
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {paladinInfo} = useContext(PaladinContext);
  return(
    <div className="actions">
      <button onClick={()=>increaseSkeletons(gameID)}>
        end phase
      </button>
    </div>
  )
}


const FinalChoices = () => {
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {paladinInfo} = useContext(PaladinContext);
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
  if(!skeletonInfo){
    return(
      <h1>
        loading
      </h1>
    )
  }
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
  if(!skeletonInfo){
    return(
      <h1>
        loading
      </h1>
    )
  }
  return(
    <div>
      <h3>
        march order
      </h3>
      <h3>
        current up: {}
      </h3>
      <FinalChoices/>
    </div>

  )
}

const ActionList3  = () =>{
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
  return(
    <div>
      <h3>
        spend 3 stability to gain a new skeleton 
      </h3>
      
      <FinalChoices/>
    </div>

  )
}

const ActionList4  = () =>{
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
      <p>
        {action}
      </p>
      <p>
        {actionInfo1}
      </p>
    </div>
  )
}

export default SkeletonActions;