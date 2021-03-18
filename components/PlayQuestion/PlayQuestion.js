import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { shuffle } from "lodash";
import { Card, Button, Header, RowCenter, Title, SpacerBar } from "../Styled";
import { clean } from "../../helpers";

const PlayQuestion = ({
  question: { incorrect_answers, correct_answer, question },
  addUserGuess,
  usersHavePlayed,
}) => {
  const [shuffledQuestions, setDisplay] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const options = [correct_answer, ...incorrect_answers];
    setDisplay(shuffle(options));
    setSelected(null);
  }, [correct_answer, incorrect_answers]);

  const handleSelect = async (
    userGuess,
    correctAnswer,
    question,
    updateScoreCallback
  ) => {
    if (!selected) {
      setSelected(userGuess);
      updateScoreCallback(userGuess, correctAnswer, question);
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
              handleSelect(q, correct_answer, question, addUserGuess);
            }}
          >
            {clean(q)}
          </Button>
        ))}
      </RowCenter>
      {usersHavePlayed &&
        usersHavePlayed.map((user) => (
          <>
            {user.hasPlayed && (
              <div>
                {user.name} has played <img src={user.photo} alt="" />
              </div>
            )}
          </>
        ))}
    </Card>
  );
};

export default PlayQuestion;
