import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { shuffle } from "lodash";
import { Card, Button, Header, RowCenter, Title, SpacerBar } from "../Styled";
import { clean } from "../../helpers";

const PlayQuestion = ({
  question: { incorrect_answers, correct_answer, question, round },
  count,
  gameId,
}) => {
  const [shuffledQuestions, setDisplay] = useState([]);
  const [playerData, setPlayerData] = useState(null);
  const [selected, setSelected] = useState(null);

  const user = firebase.auth().currentUser;
  const playersRef = firebase
    .firestore()
    .collection(`quizDB/${gameId}/players`);

  useEffect(() => {
    const options = [correct_answer, ...incorrect_answers];
    setDisplay(shuffle(options));
    setSelected(null);
  }, [correct_answer, incorrect_answers]);

  useEffect(() => {
    playersRef
      .where("Id", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = { docId: doc.id, ...doc.data() };
          setPlayerData({ docId: doc.id, ...doc.data() });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [playerData]);

  const handleSelect = async (answer) => {
    if (!selected) {
      const getScore = correct_answer === answer ? 1 : 0;
      setSelected(answer);
      const newScore = { ...playerData, score: playerData.score + getScore };
      setPlayerData(newScore);
      playersRef.doc(playerData.docId).set(newScore);
    }
  };

  return (
    <Card>
      <Title>{clean(question)}</Title>
      <SpacerBar white />
      <RowCenter>
        {shuffledQuestions.map((q, index) => (
          <Button
            white
            margin={"10px"}
            width={"80%"}
            pad={"1.3em 2em"}
            key={`${q[0]}-${index}`}
            active={q === selected}
            onClick={() => {
              handleSelect(q);
            }}
          >
            {clean(q)}
          </Button>
        ))}
      </RowCenter>
    </Card>
  );
};

export default PlayQuestion;
