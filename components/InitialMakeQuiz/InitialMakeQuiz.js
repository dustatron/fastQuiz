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

const InitialMakeQuiz = () => {
  const [quizName, setQuizName] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();
  const auth = firebase.auth();

  const quizDBRef = firebase.firestore().collection("quizDB");

  const addErrorMessage = () => {
    setError("Please name your quiz");
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const handleAddQuiz = async (e) => {
    e.preventDefault();

    if (quizName.length <= 0) {
      return addErrorMessage();
    }

    const { uid, photoURL, displayName } = auth.currentUser;
    const quizId = await quizDBRef
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
        <CenterItem>
          <Button type="submit">Join Game</Button>
        </CenterItem>
      </form>
    </Section>
  );
};

export default InitialMakeQuiz;
