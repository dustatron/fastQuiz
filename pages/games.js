import React from "react";
import {
  Section,
  Card,
  Title,
  Button,
  ButtonShy,
  RowCenter,
  RowSpacedOut,
  RowSide,
  Detail,
} from "../components/Styled";

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
        <Card lite>
          <RowSpacedOut top>
            <Title justify="left" left>
              {game.title}
            </Title>
            <ButtonShy>🗑</ButtonShy>
          </RowSpacedOut>
          <RowSpacedOut bottom>
            <RowSide>
              <Detail marginR={"5px"} borderR>
                Questions: {game.questions}
              </Detail>
              <Detail marginR={"5px"} borderR>
                Rounds: {game.rounds}
              </Detail>
              <Detail>Created: {game.created}</Detail>
            </RowSide>
            <RowSide end>
              <Button margin={"5px"}>Edit</Button>
              <Button margin={"5px"}>Play</Button>
            </RowSide>
          </RowSpacedOut>
        </Card>
      ))}
    </Section>
  );
};

export default games;
