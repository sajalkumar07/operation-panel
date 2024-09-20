import firebase from "../components/NativeActivity/firebase";
import { firebaseAuthentication } from "../services";

export const checkFirebaseAuthentication = async id => {
  const { data } = await firebaseAuthentication(id);
  let authenticationStatus = false;
  await firebase
    .auth()
    .signInWithCustomToken(data.data.customToken)
    .then(user => {
      console.log("Firebase Success");
      authenticationStatus = true;
    })
    .catch(error => {
      console.log("Firebase signin error", error);
    });
  return authenticationStatus;
};
