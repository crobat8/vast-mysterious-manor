const arrayToSend = [1, 2, 3, 4, 5]; // Replace with your desired array

const sendArrayToFirebaseFunction = async () => {
  try {
    const response = await fetch('https://processarray-bquiaqmt4q-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data:arrayToSend}),
    });

    const data = await response.json();
    console.log('Response from Firebase Cloud Function:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};


function testMessage(){
  sendArrayToFirebaseFunction();
}

export default{
  "testMessage": testMessage
}