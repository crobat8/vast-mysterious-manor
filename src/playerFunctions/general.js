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
 * @param {Array} locations to 
 */
function revealTile(docId,locations){
  sendReveal(docId,locations)
}

export default{
  "revealTile": revealTile
}