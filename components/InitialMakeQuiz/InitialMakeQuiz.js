import React, { useState } from "react";
import firebase from "firebase";
import { useRouter } from "next/router";

// Components
import Section from "../Styled/Section";
import Card from "../Styled/Card";
import Title from "../Styled/Title";
import Input from "../Styled/Input";
import Button from "../Styled/Button";
import CenterItem from "../Styled/CenterItem";

const InitialMakeQuiz = () => {
  const router = useRouter();
  const [quizName, setQuizName] = useState("");
  const auth = firebase.auth();

  const quizDBRef = firebase.firestore().collection("quizDB");

  const handleAddQuiz = async (e) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;
    const quizId = await quizDBRef
      .add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        quizName,
        authName: displayName,
        authId: uid,
        authPhoto: photoURL,
        rounds: [{ round: 1, questions: [] }],
      })
      .then((doc) => {
        console.log("doc id", doc.id);
        router.push(`/edit/${doc.id}`);
      });
  };

  return (
    <Section>
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
