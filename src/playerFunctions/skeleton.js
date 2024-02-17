const sendGainSkeleton = async (ID) => {
  const endpoint = 'https://gainskeleton-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
  };
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (response.ok) {
      const result = await response.text();
      console.log("Update successful:", result);
    } else {
      const errorMessage = await response.text();
      console.error("Error:", errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

function gainSkeleton(ID){
  sendGainSkeleton(ID)
}

const sendChangeStability = async (ID,ammount,gainOrLoose) => {
  const endpoint = 'https://changestability-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    ammount: ammount,
    gainOrLoose: gainOrLoose,
  };
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (response.ok) {
      const result = await response.text();
      console.log("Update successful:", result);
    } else {
      const errorMessage = await response.text();
      console.error("Error:", errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

function changeStability (ID,ammount,gainOrLoose){
  sendChangeStability (ID,ammount,gainOrLoose)
}

const sendMove = async (ID,Loc,name) => {
  const endpoint = 'https://moveskeleton-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    location: Loc,
    skeletonName: name,
  };
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (response.ok) {
      const result = await response.text();
      console.log("Update successful:", result);
    } else {
      const errorMessage = await response.text();
      console.error("Error:", errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// takes in a game ID and a location to move the paladin to
function move(ID,location,name){
  sendMove(ID,location,name)
}

const sendEndMarch = async (ID) => {
  const endpoint = 'https://endmarch-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
  };
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (response.ok) {
      const result = await response.text();
      console.log("Update successful:", result);
    } else {
      const errorMessage = await response.text();
      console.error("Error:", errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// takes in a game ID and a location to move the paladin to
function endMarch(ID){
  sendEndMarch(ID)
}

const sendRespawn = async (ID,name) => {
  const endpoint = 'https://respawnskeleton-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    skeletonName: name
  };
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (response.ok) {
      const result = await response.text();
      console.log("Update successful:", result);
    } else {
      const errorMessage = await response.text();
      console.error("Error:", errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// takes in a game ID and a location to move the paladin to
function respawn(ID,name){
  sendRespawn(ID,name)
}

const sendDrawGear = async (ID) => {
  const endpoint = 'https://drawgearcard-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
  };
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (response.ok) {
      const result = await response.text();
      console.log("Update successful:", result);
    } else {
      const errorMessage = await response.text();
      console.error("Error:", errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// takes in a game ID and a location to move the paladin to
function drawGear(ID){
  sendDrawGear(ID)
}

const sendEquipGear = async (ID,skeletonName,gearName) => {
  const endpoint = 'https://equipgear-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    skeletonName: skeletonName,
    gearName:gearName,
  };
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (response.ok) {
      const result = await response.text();
      console.log("Update successful:", result);
    } else {
      const errorMessage = await response.text();
      console.error("Error:", errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// takes in a game ID and a location to move the paladin to
function equipGear(ID,skeletonName,gearName){
  sendEquipGear(ID,skeletonName,gearName)
}

export default{
  "gainSkeleton":gainSkeleton,
  "changeStability": changeStability,
  "drawGear": drawGear,
  "move": move,
  "endMarch": endMarch,
  "respawn": respawn,
  "equipGear": equipGear,
}