import React from "react";
import { Section, Card, Title, Button } from "../components/Styled";

const games = () => {
  return (
    <Section>
      <h1>Games</h1>
      <Card lite>
        <div>
          <Title justify="left"> Friday Night Quiz </Title>
          <div>🗑</div>
        </div>
        <div>
          <div>Questions: 10</div>
          <div>Rounds: 2</div>
          <div>Created: 10/12/2014</div>
          <Button>Edit</Button>
          <Button>Play</Button>
        </div>
      </Card>
      <Card lite>Game stuff here</Card>
    </Section>
  );
};

export default games;
