import React, { useContext} from 'react';

import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';

import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';
import spider from '../playerFunctions/spider';
import { SkeletonContext } from '../context/SkeletonContext';
import { SpiderContext } from '../context/SpiderContext';

import { CountToken } from '../helperFunctions/Helpers';
import { TileContext } from '../context/TileContext';


const SpiderActions = () =>{ 
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction
        ,actionInfo1,setActionInfo1
        ,actionInfo2,setActionInfo2
        ,actionInfo3,setActionInfo3
        ,actionInfo4,setActionInfo4
        ,actionUses,setActionUses
        ,clearActions} = useContext(ActionContext)
  const {spiderInfo} = useContext(SpiderContext)
  const {tileInfo} = useContext(TileContext)

  const pickForm = (ID,form) =>{
    //will need to add local input for this function to select 
    //where the giant and caster go when switching from spiderlings
    spider.spiderForm(ID[0],form)
    // dont be an idiot un-comment this line when done testing
    general.endPhase(ID[0]);
  }
  
  const feed = (ID) =>{
    spider.feed(ID[0]);
  }
  
  const scare = (ID,setAction) =>{
    setAction("scare");
  }
  
  const tend = () =>{
    spider.tend(gameID[0]);
  }

  const endMovement = (ID,spiderlingNum,clearActions,movesLeft) =>{
    if(movesLeft<4){
      spider.move(ID[0],-100,"casterLoc",spiderlingNum);
    }
    clearActions();
  }
  
  const pauseMovement = (clearActions) =>{
    clearActions();
  }
  
  const phase3Action = (ID,actionName,setAction) =>{
    setAction(actionName)
  }
  
  function ConfirmEyesRotation (ID,spiderInfo){
    //actioninfo3 = loc
    //actioninfo4 = rot

    const spots = [[actionInfo3,actionInfo4]]
    general.revealTile(ID[0],spots);
    if(tileInfo[actionInfo3].value.floorType == "blood"){
      console.log("test")
      spider.changeBlood(ID[0],1);
    }
    if(spiderInfo.form == "spiderling"){
    }else{
      if(actionUses>1){
        setActionUses(actionUses-1);
        setActionInfo2(null)
        setActionInfo3(null)
        setActionInfo4(null)
      }else{
        spider.discard(ID[0],actionInfo1);
        clearActions();
      }
    }
    return null
  }
  
  const skipSecondUse = (ID,toBeDiscarded,clearActions) =>{
    spider.discard(ID[0],toBeDiscarded);
    clearActions();
  }
  
  const EndPhase = (ID,clearActions) =>{
    general.endPhase(ID[0]);
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
  
  const RotateChoices = ()=>{
    const {gameInfo,gameID} = useContext(GameContext);
    const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,setActionInfo2,actionInfo3,setActionInfo3,actionInfo4,setActionInfo4,actionUses,setActionUses,clearActions} = useContext(ActionContext)
    const {paladinInfo} = useContext(PaladinContext);
    const {spiderInfo} = useContext(SpiderContext);
    return(
      <div className="actions">
        <div>
          choose an oriantation of the tile you moved to
        </div>
        <div>
          <button onClick={()=>setActionInfo4(0)}>
            North
          </button>
          <button onClick={()=>setActionInfo4(1)}>
            East
          </button>
          <button onClick={()=>setActionInfo4(2)}>
            South
          </button>
          <button onClick={()=>setActionInfo4(3)}>
            West
          </button> 
          <button onClick={()=>ConfirmEyesRotation(gameID,spiderInfo)}>
            confirm oriantation
          </button>
        </div>
  
      </div>
    )
  }
  
  const CancelChoice = () => {
    const {gameInfo,gameID} = useContext(GameContext);
    const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
    return(
      <div className="finale">
        <button onClick={()=>clearActions()}>
          cancel action
        </button>
      </div>
    )
  }
  
  const FinshMovement = () => {
    const {gameInfo,gameID} = useContext(GameContext);
    const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
    const {spiderInfo} = useContext(SpiderContext);
    const tempSpiderlingNum = +actionInfo1[10];
    
    return(
      <div className="finale">
        {spiderInfo.form == "spiderling"
        ?
        <button onClick={()=>endMovement(gameID,tempSpiderlingNum,clearActions,spiderInfo.movesLeft)}>
          {spiderInfo.movesLeft == 4
          ?
          <p>
            cancel spiderling Movement
          </p>
          :
          <p>
            end spiderling movement
          </p>
          }
  
        </button>
        :
        <button onClick={()=>pauseMovement(clearActions)}>
          <p>
            pause curret movement
          </p>
        </button>
        }
      </div>
    )
  }
  
  const ActionList1  = () =>{
    const {gameInfo,gameID} = useContext(GameContext);
    return(
      <div>
        <h3>
          choose what form you want to take
        </h3>
        <div className="actions">
          <button onClick={()=>pickForm(gameID,"giantSpider")}>
            Giant Spider
          </button>
          <button onClick={()=>pickForm(gameID,"caster")}>
            Caster
          </button>
          <button onClick={()=>pickForm(gameID,"spiderling")}>
            Spiderling
          </button>
        </div>
      </div>
  
    )
  }
  
  const ActionList2  = () =>{
    const {gameInfo,gameID} = useContext(GameContext);
    const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
    const {spiderInfo} = useContext(SpiderContext);
    return(
      <div>
        <h3>
          choose to gain terror this turn 
        </h3>
        {action == null
        ?
        <div className="actions">
          {spiderInfo.blood>=3 && !spiderInfo.fedThisTurn
          ?
          <button onClick={()=>feed(gameID)}>
            Feed
          </button>
          :
          <div/>
          }
  
          {CountToken("web",tileInfo)>=6 
          && spiderInfo.spellCards.length>=1
          &&!spiderInfo.scaredThisTurn
          ?
          <button onClick={()=>scare(gameID,setAction)}>
            Scare
          </button>
          :
          <div/>
          }
          
        </div>
        :
        <h4>
          pick a card to discard
        </h4>
        }
        <FinalChoices/>
      </div>
  
    )
  }
  
  const ActionList3  = () =>{
    const {gameInfo,gameID} = useContext(GameContext);
    const {action,setAction,actionInfo1,setActionInfo1,actionInfo2,actionUses,clearActions} = useContext(ActionContext)
    const {spiderInfo} = useContext(SpiderContext);
  
    return(
      <div>
        <h3>
          select an action to take or click a piece to move it
        </h3>
        {action == "move"
        ?
        <div>
          <h4>
            select a tile to move to
            {/* display the options for this */}
          </h4>
          <FinshMovement/>
        </div>
  
        :actionInfo2 == "rotate"
        ?
        <RotateChoices/>
        :actionInfo1 != null
        ?
        <div>
          <h4>
            select a tile to do {action} on 
            {/* display the options for this */}
          </h4>
          <h5>
            you can do it {actionUses} more times
          </h5>
          {spiderInfo.form == "giantSpider" && 
          actionUses == 1
          ?
            <div>
              <button onClick={()=>skipSecondUse(gameID,actionInfo1,clearActions)}>
                skip second use
              </button>
            </div>
          :
          <>
          </>
          }
        </div>
  
        :action != null 
        ?
        <h4>
          select a card to use for {action}
          {/* display the options for this */}
        </h4>
        :spiderInfo.spellCards.length >= 1
        ?
          <div className="actions">
            {spiderInfo.spellCards.includes("eyes") 
            || spiderInfo.form == "caster"
            ?
            <button onClick={()=>phase3Action(gameID,"eyes",setAction)}>
              eyes
            </button>
            :
            <div/>
            }
  
            {spiderInfo.spellCards.includes("fangs") 
            || spiderInfo.form == "giantSpider"
            ?
            <button onClick={()=>phase3Action(gameID,"fangs",setAction)}>
              fangs
            </button>
            :
            <div/>
            }
  
            {spiderInfo.spellCards.includes("webs") 
            || spiderInfo.form == "spiderling"
            ?
            <button onClick={()=>phase3Action(gameID,"webs",setAction)}>
              webs
            </button>
            :
            <div/>
            }
  
            {spiderInfo.form == "caster"
            ?
            <button onClick={()=>phase3Action(gameID,"veil",setAction)}>
              veil
            </button>
            :
            <div/>
            }
  
            {spiderInfo.blood >= 1
            &&  spiderInfo.form == "caster"
            ?
            <button onClick={()=>phase3Action(gameID,"tend",setAction)}>
              tend
            </button>
            :
            <div/>
            }
  
            {spiderInfo.form == "giantSpider"
            ?
            <button onClick={()=>phase3Action(gameID,"layEgg",setAction)}>
              lay Egg
            </button>
            :
            <div/>
            }
  
            {/* <button onClick={()=>phase3Action(gameID,"legs",setAction)}>
              legs
            </button> */}
            
            {spiderInfo.form == "spiderling"
            ?
            <button onClick={()=>phase3Action(gameID,"loot",setAction)}>
              loot
            </button>
            :
            <div/>
            }
          </div>
        :spiderInfo.blood >= 1
          &&  spiderInfo.form == "caster"
        ?
          <div className="actions">
            <button onClick={()=>tend()}>
              tend
            </button>
          </div>
        :
          <div/>
        }
        
        <FinalChoices/>
        {/* need to iron things out before 100% adding this */}
        {/* <CancelChoice/> */}
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
          draw more cards
        </h3>
        <FinalChoices/>
      </div>
  
    )
  }

  if(!spiderInfo){
    return(
      <h1>
        loading
      </h1>
    )
  }
  
  return (
    <div className="spiderActionContainer">
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

export default SpiderActions;