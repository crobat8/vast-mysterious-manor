import React, { useContext} from 'react';

import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';
import { SkeletonContext } from '../context/SkeletonContext';

import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import skeleton from '../playerFunctions/skeleton';
import { TileContext } from '../context/TileContext';

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

const strike = (ID) =>{
  // need to implement strike here
  skeleton.endMarch(ID[0]);
}

const loot = (ID) =>{
  // need to implement loot here
  skeleton.endMarch(ID[0]);
}

const breach = (ID) =>{
  // need to implement breach here
  skeleton.endMarch(ID[0]);
}

const tunnel = (ID) =>{
  // need to implement tunnel here
  skeleton.endMarch(ID[0]);
}

const arm = (ID) =>{
  // need to implement arm here
  skeleton.endMarch(ID[0]);
}

const EndMoveButtons = () =>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {skeletonInfo} = useContext(SkeletonContext);
  const {tileInfo} = useContext(TileContext);
  const activeSkeletonLoc = skeletonInfo.currentSkeleton + "Loc";
  const activeSkeletonLocation = skeletonInfo[activeSkeletonLoc];

  return(
    <div className="actions">
      {/* strike button if there is something to hit */}
      {tileInfo[activeSkeletonLocation].value.facing == "up"?
        <button onClick={()=>strike(gameID)}>
          STRIKE!!
        </button>
        :
        <div/>
      }
      {/* loot if the tile has a treasure */}
      {tileInfo[activeSkeletonLocation].value.facing == "up"?
        <button onClick={()=>loot(gameID)}>
          LOOT!!
        </button>
        :
        <div/>
      }
      {/* breach if the space has a wall or adjacent has walls and is facing up*/}
      {tileInfo[activeSkeletonLocation].value.facing == "up"?
        <button onClick={()=>breach(gameID)}>
          BREACH!!
        </button>
        :
        <div/>
      }
      {/* tunnel if the tile has a pit and is facing up */}
      {tileInfo[activeSkeletonLocation].value.floorType == "pit" &&
           tileInfo[activeSkeletonLocation].value.facing == "up"?
        <button onClick={()=>tunnel(gameID)}>
          TUNNEL!!
        </button>
        :
        <div/>
      }
      {/* arm if the tile is has an armory */}
      {
        tileInfo[activeSkeletonLocation].value.floorType == "armory"?
        <button onClick={()=>arm(gameID)}>
          ARM!!
        </button>
        :
        <div/>
      }
    </div>
  )
}

const FinalChoices = () => {
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  return(
    <div className="finale">
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
        <EndMoveButtons/>
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