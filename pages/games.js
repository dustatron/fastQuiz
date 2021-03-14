import React from "react";
import GameCard from "../components/GameCard";
import { Section } from "../components/Styled";

const fakeData = [
  {
    title: "Friday Night Quiz",
    questions: 10,
    rounds: 3,
    created: "10/12/2014",
  },
  {
    title: "Poop Quiz",
    questions: 3,
    rounds: 3,
    created: "10/12/2014",
  },
  {
    title: "Dogs and Cats",
    questions: 300,
    rounds: 3,
    created: "10/12/2014",
  },
];

const games = () => {
  return (
    <Section>
      <h1>Games</h1>
      {fakeData.map((game) => (
        <GameCard game={game} />
      ))}
    </Section>
  );
};

export default games;
