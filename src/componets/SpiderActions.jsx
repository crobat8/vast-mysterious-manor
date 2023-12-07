import React, { useContext} from 'react';

import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';

import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';

const SpiderActions = () =>{ 
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)

  const EndPhase = (ID) =>{
    general.endPhase(ID[0]);
  }

  return (
    <div className="spiderActionContainer">
      <h1>
        current actions
      </h1>
      <button onClick={()=>EndPhase(gameID)}>
        end phase
      </button>
      <p>
        {action}
      </p>
      <p>
        {actionInfo1}
      </p>
    </div>
  )
}

export default SpiderActions;