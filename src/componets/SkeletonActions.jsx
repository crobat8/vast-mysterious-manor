import React, { useContext} from 'react';

import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';
import { SkeletonContext } from '../context/SkeletonContext';

import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import skeleton from '../playerFunctions/skeleton';
import { TileContext } from '../context/TileContext';

const SkeletonActions = () =>{ 
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {skeletonInfo} = useContext(SkeletonContext);
  const {tileInfo} = useContext(TileContext);

  const EndPhase = () =>{
    general.endPhase(gameID[0]);
  }

  const IncreaseSkeletons = () =>{
    skeleton.gainSkeleton(gameID[0]);
    general.endPhase(gameID[0]);
  }

  const GainSkeleton = () => {
    return(
      <div className="actions">
        <button onClick={()=>IncreaseSkeletons()}>
          gain a skeleton
        </button>
      </div>
    )
  }

  const endMarch = () =>{
    skeleton.endMarch(gameID[0]);
  }

  const EndMarchButton = () => {
    return(
      <div className="actions">
        <button onClick={()=>endMarch()}>
          end currentMarch
        </button>
      </div>
    )
  }

  const strike = () =>{
    // need to implement strike here
    skeleton.endMarch(gameID[0]);
  }

  const loot = (loc) =>{
    console.log(loc)
    general.removeToken(gameID[0],loc,"treasure");
    skeleton.changeStability(gameID[0],2,"G");
    skeleton.endMarch(gameID[0]);
  }

  const breach = () =>{
    // need to implement breach here
    skeleton.endMarch(gameID[0]);
  }

  const tunnel = () =>{
    // need to implement tunnel here
    skeleton.endMarch(gameID[0]);
  }

  const arm = () =>{
    // need to implement arm here
    skeleton.endMarch(gameID[0]);
  }

  const EndMoveButtons = () =>{
    const activeSkeletonLoc = skeletonInfo.currentSkeleton + "Loc";
    const activeSkeletonLocation = skeletonInfo[activeSkeletonLoc];
    
    console.log(tileInfo)
    console.log(activeSkeletonLocation)
    // console.log(tileInfo[activeSkeletonLocation])
    // console.log(tileInfo[activeSkeletonLocation].value)
    // console.log(tileInfo[activeSkeletonLocation].value.tokens)
    // console.log(tileInfo[activeSkeletonLocation].value.tokens.includes("treasure"))

    if(activeSkeletonLocation < 0){
      return 
      <div>

      </div>
    }

    return(
      <div className="actions">
        {/* strike button if there is something to hit */}
        {tileInfo[activeSkeletonLocation].value.facing == "up"?
          <button onClick={()=>strike()}>
            STRIKE!!
          </button>
          :
          <div/>
        }
        {/* loot if the tile has a treasure */}
        {tileInfo[activeSkeletonLocation].value.tokens.includes("treasure")?
          <button onClick={()=>loot(activeSkeletonLocation)}>
            LOOT!!
          </button>
          :
          <div/>
        }
        {/* breach if the space has a wall or adjacent has walls and is facing up*/}
        {tileInfo[activeSkeletonLocation].value.facing == "up"?
          <button onClick={()=>breach()}>
            BREACH!!
          </button>
          :
          <div/>
        }
        {/* tunnel if the tile has a pit and is facing up */}
        {tileInfo[activeSkeletonLocation].value.floorType == "pit" &&
            tileInfo[activeSkeletonLocation].value.facing == "up"?
          <button onClick={()=>tunnel()}>
            TUNNEL!!
          </button>
          :
          <div/>
        }
        {/* arm if the tile is has an armory */}
        {
          tileInfo[activeSkeletonLocation].value.floorType == "armory"?
          <button onClick={()=>arm()}>
            ARM!!
          </button>
          :
          <div/>
        }
      </div>
    )
  }

  const FinalChoices = () => {
    return(
      <div className="finale">
        <button onClick={()=>EndPhase()}>
          end phase
        </button>
      </div>
    )
  }

  const ActionList1  = () =>{
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
    return(
      <div>
        <h3>
          gain 2 stability
        </h3>
        <FinalChoices/>
      </div>
    )
  }

  // makes sure info loads before rendering anything
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