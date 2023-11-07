
import { functions } from '../firebase';
import { httpsCallable } from "firebase/functions";

const cloudFunctionURL = 'https://addmessage-bquiaqmt4q-uc.a.run.app';

const sendMessageToCloudFunction = async (message) => {




  const url = `${cloudFunctionURL}?text=${message}`;

  try {
    const response = await fetch(url, {
      method: 'POST', // Change the method if your Cloud Function expects a different type of request
    });

    if (response.ok) {
      console.log('Cloud Function executed successfully');
    } else {
      console.error('Failed to trigger Cloud Function:', response.status);
    }
  } catch (error) {
    console.error('Error triggering Cloud Function:', error);
  }
};


function testMessage(){
  sendMessageToCloudFunction("this is a test")
}

export default{
  "testMessage": testMessage
}