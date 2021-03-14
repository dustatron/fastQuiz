import React from "react";
import {
  Card,
  Title,
  Button,
  ButtonShy,
  RowSpacedOut,
  RowSide,
  Detail,
} from "../Styled";

const GameCard = ({ game }) => {
  return (
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
  );
};

export default GameCard;
