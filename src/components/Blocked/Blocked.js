import React from "react";
import { Section, Detail, TitleLarge, RowCenter, Button } from "../Styled";
import firebase from "firebase/app";

const signInWithGoogle = async () => {
  // Retrieve Google provider object
  const provider = new firebase.auth.GoogleAuthProvider();
  // Set language to the default browser preference
  firebase.auth().useDeviceLanguage();
  // Start sign in process
  try {
    await firebase.auth().signInWithPopup(provider);
  } catch (error) {
    console.log(error.message);
  }
};

const Blocked = () => {
  return (
    <Section height={"80vh"}>
      <Detail lite padBottom={"1em"}>
        You must be logged in to view this content
      </Detail>
      <TitleLarge padBottom={"1rem"} dark>
        Please Login
      </TitleLarge>
      <RowCenter>
        <Button onClick={signInWithGoogle}>Login</Button>
      </RowCenter>
    </Section>
  );
};

export default Blocked;
