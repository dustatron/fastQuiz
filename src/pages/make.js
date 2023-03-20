import React from "react";
import { SpacerBar } from "../components/Styled";
import QuestionHeader from "../components/QuestionHeader";
import QuestionSingle from "../components/QuestionSingle";
import withAuth from "../components/WithPrivateRoute";
import Head from "next/head";
import InitialMakeQuiz from "../components/InitialMakeQuiz";

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
      <Head>
        <title>FastQuiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <InitialMakeQuiz />
    </>
  );
};

export default withAuth(make);
