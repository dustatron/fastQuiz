import React from "react";
import { clean } from "../../helpers";
import { Card, Header, RowCenter, Title, SpacerBar } from "../Styled";
import PlayerCard from "../PlayerCard";

const PlayAnswer = ({
  currentSlide,
  players,
  answerData: { round, answer, questionsLeftInRound, question },
}) => {
  return (
    <>
      <Title>Question {questionsLeftInRound}</Title>
      <Title>ROUND : {round}</Title>
      <Card>
        <Title> The Correct Answer Was </Title>
        <SpacerBar white />

        <RowCenter>
          <Header>{clean(answer)}</Header>
        </RowCenter>
      </Card>
      <RowCenter>
        {players &&
          players.map((player) => (
            <PlayerCard
              // name={player.name}
              photo={player.photo}
              correct={
                answer ===
                player.userAnswer[player.theQuestion.indexOf(question)]
                  ? 2
                  : 1
              }
              answer={player.userAnswer[player.theQuestion.indexOf(question)]}
            />
          ))}
      </RowCenter>
    </>
  );
};

export default PlayAnswer;

/*        
interface answerData = {
  type: "answer",
  question: "string"
  round: number
  answer: "string"
  questionsLeftInRound: `1 of 10`,
} 
          */
