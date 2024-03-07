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

export default{
  "assignOmen": assignOmen,

}