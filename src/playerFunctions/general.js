const sendReveal = async (ID,locs) => {
  const endpoint = 'https://reavealtiles-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    arrayFieldName: "tiles",
    arrayDataToUpdate: locs
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

/**
 * send db what tiles to flip over
 * @param {Array} locations double array wehre each element contains a where (0-49)and a rotation (0-3)
 */
function revealTile(docId,locations){
  sendReveal(docId,locations)
}

const sendEndPhase = async (ID) => {
  const endpoint = 'https://endturn-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
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

/**
 * send db what tiles to flip over
 * @param  double array wehre each element contains a where (0-49)and a rotation (0-3)
 */
function endPhase(docId){
  sendEndPhase(docId)
}

const sendAddToken = async (ID,loc,tokenName) => {
  const endpoint = 'https://addtoken-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    location: loc,
    token: tokenName,
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

/**
 * send db what tiles to flip over
 * @param {string} docId document identification string 
 * @param {Array} location spot to add the token
 * @param {string} token name of token to be added
 */
function addToken(docId,location,token){
  sendAddToken(docId,location,token)
}

const sendRemoveToken = async (ID,loc,tokenName) => {
  const endpoint = 'https://removetoken-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    location: loc,
    token: tokenName,
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

/**
 * send db what tiles to flip over
 * @param {string} docId document identification string 
 * @param {Array} location spot to add the token
 * @param {string} token name of token to be removed
 */
function removeToken(docId,location,token){
  sendRemoveToken(docId,location,token)
}

const sendHide= async (ID,loc) => {
  const endpoint = 'https://hidetile-bquiaqmt4q-uc.a.run.app'; // Replace with your Cloud Function endpoint
  
  const requestData = {
    documentId: ID,
    location: loc
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

/**
 * send db what tiles to flip over
 * @param {Array} locations double array wehre each element contains a where (0-49)and a rotation (0-3)
 */
function hideTile(docId,location){
  sendHide(docId,location)
}

export default{
  "revealTile": revealTile,
  "endPhase": endPhase,
  "addToken": addToken,
  "removeToken": removeToken,
  "hideTile": hideTile,
}