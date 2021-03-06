import React, { useContext } from "react";
import GlobalContext, { globalDispatchContext } from "../helpers/GlobalContext";
import { LOG_USER_IN, LOG_USER_OUT } from "../helpers/constants";
// Firebase deps
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Hooks
import { useAuthState } from "../helpers";

import NavBar from "../components/NavBar";
import GlobalStyle from "../helpers/globalStyles";
import { Container, Spinner, Section, RowCenter } from "../components/Styled";

/* Check if firebase is already initialized */
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCpR_WqSfe8yvX8bAEAIVw_tWuiT4Oi8Eo",
    authDomain: "trivia-game-e5783.firebaseapp.com",
    databaseURL: "https://trivia-game-e5783-default-rtdb.firebaseio.com",
    projectId: "trivia-game-e5783",
    storageBucket: "trivia-game-e5783.appspot.com",
    messagingSenderId: "691408243393",
    appId: "1:691408243393:web:984c6e2f3a1f3c1d5de240",
    measurementId: "G-316XKN8TRJ",
  });
} else {
  firebase.app(); // if already initialized, use that one
}

function FastQuiz({ Component, pageProps }) {
  const dispatch = useContext(globalDispatchContext);

  const { user, initializing } = useAuthState(firebase.auth(), dispatch);

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

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <GlobalContext>
      <GlobalStyle />
      <NavBar user={user} signOut={signOut} signIn={signInWithGoogle} />
      {/* TODO: Make this initializing pretty */}
      {initializing && (
        <RowCenter padTop={"2rem"}>
          <Spinner />
        </RowCenter>
      )}
      <Container>
        <Component {...pageProps} />
      </Container>
    </GlobalContext>
  );
}

export default FastQuiz;
