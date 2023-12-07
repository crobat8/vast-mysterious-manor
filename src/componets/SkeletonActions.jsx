import React, { useContext} from 'react';

import { GameContext } from '../context/GameContext';
import { ActionContext } from '../context/ActionContext';
import { PaladinContext } from '../context/PaldinContext';

import general from '../playerFunctions/general';
import paladin from '../playerFunctions/paladin';

const SkeletonActions = () =>{ 
  const {gameInfo,gameID} = useContext(GameContext);
  const {action,setAction,actionInfo1,setActionInfo1,clearActions} = useContext(ActionContext)

  return (
    <div className="skeletonActionContainer">
      <h1>
        current actions
      </h1>
      
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