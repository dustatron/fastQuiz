import React from "react";
import PlayerCard from "../PlayerCard";
import { Card, Button, RowSide, Title, SpacerBar } from "../Styled";

const PlayRound = ({ round, players }) => {
  return (
    <Card lite>
      <Title>Round {round}</Title>
      <SpacerBar />
      <RowSide>
        {players &&
          players.map((player) => (
            <PlayerCard
              name={player.name}
              photo={player.photo}
              score={player.score}
            />
          ))}
      </RowSide>
    </Card>
  );
};

export default PlayRound;
