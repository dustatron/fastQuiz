import React from "react";
import PlayerCard from "../PlayerCard";
import { Card, RowSide, Title, SpacerBar, Header } from "../Styled";

const PlayRound = ({ round, players, title }) => {
  return (
    <Card lite>
      <Title>Round {round}</Title>
      <Header>{title ? title : "No Title"}</Header>
      <SpacerBar />
      <RowSide>
        {players &&
          players.map((player) => (
            <PlayerCard
              key={player.name}
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
