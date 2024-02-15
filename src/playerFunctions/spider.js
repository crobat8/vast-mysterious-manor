const sendForm = async (ID,form) => {
  const endpoint = 'https://selectform-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    newFormName: form
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
function spiderForm(ID,form){
  sendForm(ID,form)
}

const sendFeed = async (ID) => {
  const endpoint = 'https://feed-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
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

function feed(ID){
  sendFeed(ID)
}

const sendScare = async (ID,cardType) => {
  const endpoint = 'https://scare-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    toDiscard: cardType,
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

function scare(ID,cardType){
  sendScare(ID,cardType)
}

const sendDiscard = async (ID,cardType) => {
  const endpoint = 'https://spiderdiscard-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    toDiscard: cardType,
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

function discard(ID,cardType){
  sendDiscard(ID,cardType)
}

const sendMove = async (ID,Loc,piece,fin) => {
  const endpoint = 'https://movespider-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    location: Loc,
    pieceToMove: piece,
    finishedNum: fin,
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

function move(ID,location,piece,fin){
  sendMove(ID,location,piece,fin)
}

const sendBlood = async (ID,blood) => {
  const endpoint = 'https://changeblood-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    ammount: blood,
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

function changeBlood(ID,ammount){
  sendBlood(ID,ammount)
}

const sendTend = async (ID) => {
  const endpoint = 'https://tend-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
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

function tend(ID){
  sendTend(ID)
}

const sendLoot = async (ID,treasures) => {
  const endpoint = 'https://loot-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    treasures: treasures,
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

function finishLoot(ID,treasureCount){
  sendLoot(ID,treasureCount)
}

export default{
  "spiderForm": spiderForm,
  "feed": feed,
  "scare": scare,
  "discard": discard,
  "move": move,
  "changeBlood": changeBlood,
  "tend": tend,
  "finishLoot": finishLoot,
}