import React, { useContext} from 'react';

import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';
import { SkeletonContext } from '../context/SkeletonContext';
import { SpiderContext } from '../context/SpiderContext';

import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import skeleton from '../playerFunctions/skeleton';
import {isAdjacentTiles2, isVisible2, VisibleTiles} from '../helperFunctions/Helpers'
import { TileContext } from '../context/TileContext';

const SkeletonActions = () =>{ 
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,clearActions} = useContext(ActionContext)
  const {paladinInfo} = useContext(PaladinContext);
  const {skeletonInfo} = useContext(SkeletonContext);
  const {spiderInfo} = useContext(SpiderContext)
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

  function strikeTargetDefense(targetName){
    if(targetName == "paladin"){
      return paladinInfo.preps;
    } else if(targetName == "giantSpider" || "caster"){
      return spiderInfo.defense;
    }
  }

  //runs strike action
  const strike = (targetLocation,targetName) =>{
    //add code to return to original space if stability == 0
    const tempVisibleTileArray = VisibleTiles(targetLocation,tileInfo)

    let strikeDamage = 1 
    for(let i = 0; i< skeletonInfo.skeletonsRevealed; i++){
      const tempSkeletonKey = skeletonInfo.marchOrder[i] + "Loc";
      const tempSkeletonLocation = skeletonInfo[tempSkeletonKey];

      if(
      isAdjacentTiles2(
        tempVisibleTileArray,
        tempSkeletonLocation,
        false
      )){
        strikeDamage++
      }
    }
    const defenseDamage = strikeTargetDefense(targetName);

    if(strikeDamage > defenseDamage){
      if(targetName == "paladin"){
        paladin.changeHealth(gameID[0],1,"L");
      }else if (targetName == "giantSpider" || targetName == "caster"){
        //hit spider here (doing this later since it involves changing spider form)
      }
    }
    skeleton.respawn(gameID[0],skeletonInfo.currentSkeleton);
    skeleton.changeStability(gameID[0],1,"L");
    skeleton.endMarch(gameID[0]);
  }

  // takes in a location to execute a loot action on
  const loot = (loc) =>{
    general.removeToken(gameID[0],loc,"treasure");
    skeleton.changeStability(gameID[0],2,"G");
    skeleton.endMarch(gameID[0]);
  }

  const breach = () =>{
    // need to implement breach here
    skeleton.endMarch(gameID[0]);
  }

  // set action to tunnel so we can select a pit to move to
  const tunnel = () =>{
    setAction("tunnel")
  }


  const arm = () =>{
    // need to implement arm here
    skeleton.drawGear(gameID[0]);
    skeleton.endMarch(gameID[0]);
  }

  function checkForStrikeable(currentSkeletonLocation){
    if(currentSkeletonLocation == paladinInfo.paladinLoc){
      return "paladin";
    } else if (currentSkeletonLocation == spiderInfo.giantSpiderLoc){
      return "giantSpider";
    } else if (currentSkeletonLocation == spiderInfo.casterLoc){
      return "caster";
    }
    return false
  }

  const EndMoveButtons = () =>{
    const activeSkeletonLoc = skeletonInfo.currentSkeleton + "Loc";
    const activeSkeletonLocation = skeletonInfo[activeSkeletonLoc];
    
    if(activeSkeletonLocation < 0 ){
      return(
        <EndMarchButton/>
      )
      
    }

    if(tileInfo[activeSkeletonLocation].value == ""){
      return(
        <EndMarchButton/>
      )
    }

    if(checkForStrikeable(activeSkeletonLocation)){
      return (
        <div className="actions">
          <button onClick={()=>strike(activeSkeletonLocation,checkForStrikeable(activeSkeletonLocation))}>
            STRIKE!!
          </button>
        </div>
      )
    }

    return(
      <div className="actions">
        {/* loot if the tile has a treasure */}
        {tileInfo[activeSkeletonLocation].value.tokens.includes("treasure")?
          <button onClick={()=>loot(activeSkeletonLocation)}>
            LOOT!!
          </button>
          :
          <div/>
        }
        {/* breach if the space has a wall or adjacent has walls and is facing up*/}
        {/* {tileInfo[activeSkeletonLocation].value.facing == "up"?
          <button onClick={()=>breach()}>
            BREACH!!
          </button>
          :
          <div/>
        } */}
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
        <EndMarchButton/>
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
        {action == "tunnel"?
          <div>
            <h3>
              select a pit to move to
            </h3>
          </div>
        :skeletonInfo.currentSkeleton == ""?
          <div>
            <h3>
              out of skeletons
            </h3>
          </div>
        :skeletonInfo.marchOrder.indexOf(skeletonInfo.currentSkeleton)
        < skeletonInfo.skeletonsRevealed?
        <div>
          <h3>
            current up: {skeletonInfo.currentSkeleton}
          </h3>
          <h3>
            movesLeft: {skeletonInfo.movesLeft}
          </h3>
          <EndMoveButtons/>

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