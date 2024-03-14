const sendAssignOmen = async (ID,omenType) => {
  const endpoint = 'https://assignomen-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  const requestData = {
    documentId: ID,
    omenType: omenType,
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

function assignOmen(ID,omenType){
  sendAssignOmen(ID,omenType)
}

const sendPlaceTreasure = async (ID) => {
  const endpoint = 'https://placetreasure-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
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

function placeTreasure(ID){
  sendPlaceTreasure(ID)
}

const sendEndPower = async (ID) => {
  const endpoint = 'https://endpower-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
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

function endPower(ID){
  sendEndPower(ID)
}

const sendWraithMove = async (ID,Loc) => {
  const endpoint = 'https://movewraith-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  const requestData = {
    documentId: ID,
    location: Loc
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

function wraithMove(ID,Loc){
  sendWraithMove(ID,Loc)
}

const sendSubmitRitual = async (ID,cardInfo,pathInfo) => {
  const endpoint = 'https://submitritual-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  const requestData = {
    documentId: ID,
    cardInfo: cardInfo,
    pathInfo: pathInfo,
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

function submitRitual(ID,cardInfo,pathInfo){
  sendSubmitRitual(ID,cardInfo,pathInfo)
}

export default{
  "assignOmen": assignOmen,
  "placeTreasure": placeTreasure,
  "endPower" : endPower,
  "wraithMove" : wraithMove,
  "submitRitual": submitRitual,
}