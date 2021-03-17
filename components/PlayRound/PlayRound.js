import React from "react";
import { Card, Button, Header, RowCenter, Title, SpacerBar } from "../Styled";

const PlayRound = ({ round, players }) => {
  return (
    <Card lite>
      <Title>Round {round}</Title>
      <SpacerBar />
      <RowCenter>
        {players &&
          players.map((player) => (
            <div>
              <h3>{player.name}</h3>
              <img src={player.photo} alt="author" />
              score : {player.score}
            </div>
          ))}
      </RowCenter>
    </Card>
  );
};

export default PlayRound;
