import React, { useState, useEffect } from "react";
import { shuffle } from "lodash";
import PlayerCard from "../PlayerCard";
import { Card, Button, Header, RowCenter, Title, SpacerBar } from "../Styled";
import { clean } from "../../helpers";

const PlayQuestion = ({
  question: { incorrect_answers, correct_answer, question },
  addUserGuess,
  usersHavePlayed,
  playerData,
  setPlayerData,
  playersRef,
  gameData,
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
    addUserGuess
  ) => {
    // if (!selected) {
    setSelected(userGuess);
    const params = {
      gameData,
      userGuess,
      correctAnswer,
      question,
      playerData,
      setPlayerData,
      playersRef,
    };
    addUserGuess(params);
    // }
  };

  return (
    <>
      <Card>
        <Title>{clean(question)}</Title>
        <SpacerBar white />
        <RowCenter>
          {shuffledQuestions.map((q, index) => (
            <Button
              key={`${q}-${index}`}
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
      </Card>
      <RowCenter>
        {usersHavePlayed &&
          usersHavePlayed.map((user, index) => (
            <div key={`${user.name}-${index}`}>
              {user.hasPlayed && (
                <PlayerCard name={user.name} photo={user.photo} />
              )}
            </div>
          ))}
      </RowCenter>
    </>
  );
};

export default PlayQuestion;
