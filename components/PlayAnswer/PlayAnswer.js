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
        <Header> {clean(question)} </Header>
        <SpacerBar white />

        <Title justify={"left"}>Correct answer was</Title>
        <RowSide>
          <Header>{clean(answer)}</Header>
        </RowSide>
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
