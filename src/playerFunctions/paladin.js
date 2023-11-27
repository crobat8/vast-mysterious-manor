const arrayToSend = [1, 2, 3, 4, 5]; // Replace with your desired array

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

export default{
  "prep": prep
}