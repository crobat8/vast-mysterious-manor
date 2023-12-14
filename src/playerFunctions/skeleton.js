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

export default{
  "gainSkeleton":gainSkeleton,
}