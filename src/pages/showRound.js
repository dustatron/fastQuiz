import React from "react";
import {
  Card,
  TitleLarge,
  Section,
  Detail,
  Button,
  RowSide,
} from "../components/Styled";

const fakeData = { roundTitle: "History", currentRound: 1, totalRounds: 3 };

const showRound = () => {
  const { roundTitle, currentRound, totalRounds } = fakeData;
  return (
    <Section>
      <Card>
        <Detail padTop={"5rem"}>
          Round {currentRound} of {totalRounds}{" "}
        </Detail>
        <TitleLarge padTop={"2rem"} padBottom={"5rem"}>
          {roundTitle}
        </TitleLarge>
      </Card>
      <RowSide end>
        <Button> Next </Button>
      </RowSide>
    </Section>
  );
};

export default showRound;
