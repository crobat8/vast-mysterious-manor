const sendPrep = async (ID) => {
  const endpoint = 'https://paladinprepaction-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
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


function prep(ID){
  sendPrep(ID);
}

const sendMove = async (ID,Loc) => {
  const endpoint = 'https://movepaladin-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    location: Loc,
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
function move(ID,location){
  sendMove(ID,location)
}

const sendSpendHeroCube = async (ID) => {
  const endpoint = 'https://spendherocubes-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
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

function spendHeroCube(ID){
  sendSpendHeroCube(ID)
}

const sendChangeHealth = async (ID,ammount,gainOrLoose) => {
  const endpoint = 'https://changepaladinhealth-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  const requestData = {
    documentId: ID,
    ammount: ammount,
    gainOrLoose:gainOrLoose,
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

function changeHealth(ID,ammount,gainOrLoose){
  sendChangeHealth(ID,ammount,gainOrLoose)
}

const sendChangeGrit = async (ID,ammount,gainOrLoose) => {
  const endpoint = 'https://changepaladingrit-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  const requestData = {
    documentId: ID,
    ammount: ammount,
    gainOrLoose:gainOrLoose,
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

function changeGrit(ID,ammount,gainOrLoose){
  sendChangeGrit(ID,ammount,gainOrLoose)
}

const sendPaladinHitSpider = async (ID) => {
  const endpoint = 'https://paladinhitspider-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
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

function paladinHitSpider(ID){
  sendPaladinHitSpider(ID)
}

const sendDrawTreasureCard = async (ID) => {
  const endpoint = 'https://drawtreasurecard-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
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

function drawTreasureCard(ID){
  sendDrawTreasureCard(ID)
}

export default{
  "prep": prep,
  "move": move,
  "spendHeroCube": spendHeroCube,
  "changeHealth": changeHealth,
  "changeGrit": changeGrit,
  "paladinHitSpider": paladinHitSpider,
  "drawTreasureCard": drawTreasureCard,
}