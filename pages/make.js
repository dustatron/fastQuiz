import React from "react";
import { SpacerBar } from "../components/Styled";
import QuestionHeader from "../components/QuestionHeader";
import QuestionSingle from "../components/QuestionSingle";
import withAuth from "../components/WithPrivateRoute";

const fakeData = {
  gameTitle: "Friday Night Quiz",
};

const fakeQuestion = {
  number: 1,
  handelDelete: () => {},
  q: {
    question: "How many are there?",
    correct_answer: "1",
    incorrect_answers: ["2", "3", "4"],
  },
};

const make = () => {
  return (
    <>
      <QuestionHeader title={fakeData.gameTitle} />
      <SpacerBar width={"75%"} />
      <QuestionSingle
        q={fakeQuestion.q}
        number={fakeQuestion.number}
        handelDelete={fakeQuestion.handelDelete}
      />
    </>
  );
};

export default withAuth(make);
