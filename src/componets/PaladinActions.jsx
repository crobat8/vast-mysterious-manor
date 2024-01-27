import React, { useContext} from 'react';

import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';

import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import { FindCharacters } from '../helperFunctions/Helpers';
import skeleton from '../playerFunctions/skeleton';

function prepare (ID){
  paladin.prep(ID[0]);
}

function crusade (settingAction,settingActionInfo1,ID){
  settingAction("crusade");
  //this is the step of the crusade the user is on
  settingActionInfo1("move");
  paladin.spendHeroCube(ID[0]);
}

function sprint (settingAction,settingActionInfo1,ID){
  settingAction("sprint");
  // this is how many spaces the player can move 
  settingActionInfo1(2);
  paladin.spendHeroCube(ID[0]);
}

// this is only set up to attack skeletons needs to be adjusted for
// eggs and poltergeists
function attackUnit (piece,ID,paladinInfo,characters){
  const skeletonNames = [
    "casty",
    "screamy",
    "shiny",
    "shooty",
    "singy",
    "slashy",
    "smashy",
    "sniffy",
    "stabby",
  ];

  // attacking skeleton
  if(skeletonNames.includes(piece)){
    let skeletonCount = 0;
    for(let i = 0; i<characters.length;i++){
      if(skeletonNames.includes(characters[i])){
        skeletonCount++;
      }
    }
    console.log(skeletonCount);
    if(paladinInfo.preps>skeletonCount){
      skeleton.respawn(ID[0],piece);
    }else{
      // move paladin back to origin tile
    }

  }

}

function cancel(clear) {
  clear();
}

const ConfirmCrusadeRotation = (ID,Loc,Rot,setActionInfo1,setActionInfo2)=>{
  const spots = [[Loc,Rot]]
  general.revealTile(ID[0],spots);
  setActionInfo1("attack");
  setActionInfo2(0);
}

const confirmAttack = (settingActionInfo1) =>{
  settingActionInfo1("shrine");
}

const confirmShrine = (settingActionInfo1) =>{
  settingActionInfo1("treasure");
}

const confirmTreasure = (clearing) =>{
  clearing();
}

const ConfirmSprint = (clearing)=>{
  clearing();
}

const InitialChoices = ()=>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {paladinInfo} = useContext(PaladinContext);
  return(
    <div className="actions">
      <button onClick={()=>prepare(gameID)}>
        prepare
      </button>
      <button onClick={()=>crusade(setAction,setActionInfo1,gameID)}>
        cursade
      </button>
      <button onClick={()=>sprint(setAction,setActionInfo1,gameID)}>
        sprint
      </button>
      <button onClick={()=>cancel(clearActions)}>
        cancel Action
      </button> 
      <button>
        end phase
      </button>
    </div>
  )
}

const RotateChoices = ()=>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,clearActions} = useContext(ActionContext)
  const {paladinInfo} = useContext(PaladinContext);
  return(
    <div className="actions">
      <div>
        choose an oriantation of the tile you moved to
      </div>
      <div>
        <button onClick={()=>setActionInfo2(0)}>
          North
        </button>
        <button onClick={()=>setActionInfo2(1)}>
          East
        </button>
        <button onClick={()=>setActionInfo2(2)}>
          South
        </button>
        <button onClick={()=>setActionInfo2(3)}>
          West
        </button> 
        <button onClick={()=>ConfirmCrusadeRotation(gameID,paladinInfo.paladinLoc,actionInfo2,setActionInfo1,setActionInfo2)}>
          confirm oriantation
        </button>
      </div>

    </div>
  )
}

const AttackChoices = ()=>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,clearActions} = useContext(ActionContext)
  const {paladinInfo} = useContext(PaladinContext);
  const characters = FindCharacters(paladinInfo.paladinLoc);
  const indextOfPaladin = characters.indexOf("paladin");
  characters.splice(indextOfPaladin,1);
  console.log(characters);
  return(
    <div className="actions">
      <div>
        choose all the enemies to attack
      </div>
      <div>
        {characters.map((character,key)=>{
          return(
            <button onClick={()=>attackUnit(character,gameID,paladinInfo,characters)}>
              {character}
            </button>
          )
        })}
        <button onClick={()=>prepare(gameID)}>
          prepare
        </button>
        {characters.length == 0
        ?
          <button onClick={()=>confirmAttack(setActionInfo1)}>
            finish attack
          </button>
        :
          <div/>
        }

      </div>

    </div>
  )
}

const ShrineChoices = ()=>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,clearActions} = useContext(ActionContext)
  const {paladinInfo} = useContext(PaladinContext);
  return(
    <div className="actions">
      <div>
        choose all the enemies to attack
      </div>
      <div>
        <button onClick={()=>confirmShrine(setActionInfo1)}>
          finish Shrine
        </button>
      </div>

    </div>
  )
}

const TreasureChoices = ()=>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,clearActions} = useContext(ActionContext)
  const {paladinInfo} = useContext(PaladinContext);
  return(
    <div className="actions">
      <div>
        choose all the enemies to attack
      </div>
      <div>
        <button onClick={()=>confirmTreasure(clearActions)}>
          finish Treasure
        </button>
      </div>

    </div>
  )
}

const SprintChoices = () =>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,clearActions} = useContext(ActionContext)
  const {paladinInfo} = useContext(PaladinContext);
  return(
    <div className="actions">
      <div>
        choose a tile to sprint to 
      </div>
      <div>
        <button onClick={()=>ConfirmSprint(clearActions)}>
          finish sprint
        </button>
      </div>

    </div>
  )
}

const EndPhase = (ID) =>{
  general.endPhase(ID[0]);
}

const FinalChoices = () => {
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {paladinInfo} = useContext(PaladinContext);
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
  const {paladinInfo} = useContext(PaladinContext);
  if(!paladinInfo){
    return(
      <h1>
        loading
      </h1>
    )
  }
  return(
    <div>
      <h3>
        collect hero cubes
      </h3>
      <FinalChoices/>
    </div>

  )
}

const ActionList2  = () =>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {paladinInfo} = useContext(PaladinContext);
  if(!paladinInfo){
    return(
      <h1>
        loading
      </h1>
    )
  }
  if(action == "crusade"){
    if(actionInfo1 == "move"){
      return(
        <p>
          select a tile to crusade into
        </p>
      )
    }else if(actionInfo1 == "rotate"){
      return(
        <RotateChoices/>
      )
    }else if(actionInfo1 == "attack"){
      return(
        <AttackChoices/>
      )
    }else if(actionInfo1 == "shrine"){
      return(
        <ShrineChoices/>
      )
    }else if(actionInfo1 == "treasure"){
      return(
        <TreasureChoices/>
      )
    }
  }else if(action == "sprint"){
    return(
      <SprintChoices/>
    )
  }else{
    if(paladinInfo.heroCubes<=0){
      return(
        <FinalChoices/>
      )
    }else{
      return(
        <InitialChoices/>
      )
    }

  }
}

const ActionList3  = () =>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {paladinInfo} = useContext(PaladinContext);
  if(!paladinInfo){
    return(
      <h1>
        loading
      </h1>
    )
  }
  return(
    <div>
      <h3>
        gain furry
      </h3>
      <FinalChoices/>
    </div>

  )
}

const PaladinActions = () =>{ 
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)

  return (
    <div className="paladinActionContainer">
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
      <p>
        {action}
      </p>
      <p>
        {actionInfo1}
      </p>
    </div>
  )
}

export default PaladinActions;