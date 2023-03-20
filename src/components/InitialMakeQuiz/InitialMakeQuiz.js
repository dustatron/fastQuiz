import React, { useState } from "react";
import firebase from "firebase";
import { useRouter } from "next/router";

// Components
import {
  Section,
  Card,
  Title,
  Input,
  Button,
  CenterItem,
  Error,
} from "../Styled";

const PLEASE_NAME = "Please name your quiz";
const TO_LONG = "A quiz name can only be 50 characters long";

const InitialMakeQuiz = () => {
  const [quizName, setQuizName] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();
  const auth = firebase.auth();

  const quizDBRef = firebase.firestore().collection("quizDB");

  const addErrorMessage = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const handleAddQuiz = async (e) => {
    e.preventDefault();

    if (quizName.length <= 0) {
      return addErrorMessage(PLEASE_NAME);
    }
    if (quizName.length > 50) {
      return addErrorMessage(TO_LONG);
    }

    const { uid, photoURL, displayName } = auth.currentUser;
    await quizDBRef
      .add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        quizName,
        authName: displayName,
        authId: uid,
        authPhoto: photoURL,
        rounds: [{ round: 1, questions: [] }],
        roundTitle0: "Round 1",
      })
      .then((doc) => {
        console.log("doc id", doc.id);
        router.push(`/edit/${doc.id}`);
      });
  };

  return (
    <Section>
      {error && <Error>{error}</Error>}
      <form onSubmit={handleAddQuiz}>
        <Card>
          <Title>Make Quiz</Title>
          <Input
            placeholder="Name your quiz"
            value={quizName}
            onChange={(e) => {
              setQuizName(e.target.value);
            }}
          />
          <Button white>Make</Button>
        </Card>
      </form>
    </Section>
  );
};

export default InitialMakeQuiz;
