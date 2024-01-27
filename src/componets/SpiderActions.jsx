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

const phase3Action = (ID,actionName) =>{

}

const EndPhase = (ID) =>{
  general.endPhase(ID[0]);
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
  const {tileInfo} = useContext(TileContext);
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
        <FinalChoices/>
      </div>
      :
      <h4>
        pick a card to discard
      </h4>
      }

    </div>

  )
}

const ActionList3  = () =>{
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {spiderInfo} = useContext(SpiderContext);
  const {tileInfo} = useContext(TileContext);

  return(
    <div>
      <h3>
        take actions and move
      </h3>
      {spiderInfo.spellCards.length >= 1
      ?
      <div className="actions">
        {spiderInfo.spellCards.includes("eyes") 
        || spiderInfo.form == "caster"
        ?
        <button onClick={()=>phase3Action(gameID,"eyes")}>
          eyes
        </button>
        :
        <div/>
        }

        {spiderInfo.spellCards.includes("fangs") 
        || spiderInfo.form == "giantSpider"
        ?
        <button onClick={()=>phase3Action(gameID,"fangs")}>
          fangs
        </button>
        :
        <div/>
        }

        {spiderInfo.spellCards.includes("webs") 
        || spiderInfo.form == "spiderling"
        ?
        <button onClick={()=>phase3Action(gameID,"webs")}>
          webs
        </button>
        :
        <div/>
        }

        {spiderInfo.form == "caster"
        ?
        <button onClick={()=>phase3Action(gameID,"veil")}>
          veil
        </button>
        :
        <div/>
        }

        {spiderInfo.blood >= 1
        &&  spiderInfo.form == "caster"
        ?
        <button onClick={()=>phase3Action(gameID,"tend")}>
          tend
        </button>
        :
        <div/>
        }

        {spiderInfo.form == "giantSpider"
        ?
        <button onClick={()=>phase3Action(gameID,"layEgg")}>
          lay Egg
        </button>
        :
        <div/>
        }

        <button onClick={()=>phase3Action(gameID,"legs")}>
          legs
        </button>
        
        {spiderInfo.form == "spiderling"
        ?
        <button onClick={()=>phase3Action(gameID,"loot")}>
          loot
        </button>
        :
        <div/>
        }
      </div>
      :
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
        draw more cards
      </h3>
      <FinalChoices/>
    </div>

  )
}


const SpiderActions = () =>{ 
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)
  const {spiderInfo} = useContext(SpiderContext)

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