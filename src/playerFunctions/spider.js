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

export default{
  "spiderForm":spiderForm,

}