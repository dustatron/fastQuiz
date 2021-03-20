import React from "react";
import { clean } from "../../helpers";
import {
  Card,
  Button,
  Header,
  RowCenter,
  Title,
  SpacerBar,
  RowSide,
} from "../Styled";

const PlayAnswer = ({
  answerData: { round, answer, question, questionsLeftInRound },
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
