import React from "react";
import {
  Section,
  Card,
  Input,
  Header,
  RowCenter,
  Title,
  RowSide,
  Button,
} from "../components/Styled";

const startGame = () => {
  return (
    <>
      <Section pad={"0.5rem"} height={"20vh"}>
        <h1>Start Game</h1>
        <Card>
          <Title padBottom={"1rem"}>Game Link To Share</Title>
          <Input placeholder="http://something.com" />
        </Card>
      </Section>
      <Section pad={"0.5rem"}>
        <Card lite>
          <RowCenter>
            <Header>Players</Header>
          </RowCenter>
        </Card>
        <RowSide end>
          <Button pad={"1em 3em"}>Start</Button>
        </RowSide>
      </Section>
    </>
  );
};

export default startGame;
