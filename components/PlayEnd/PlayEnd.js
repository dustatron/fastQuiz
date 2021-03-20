import React from "react";
import PropTypes from "prop-types";
import PlayerCard from "../PlayerCard";
import { Card, Button, Header, RowSide, Title, SpacerBar } from "../Styled";

const PlayEnd = ({ players }) => {
  return (
    <Card lite>
      <Header>Game Over</Header>
      <SpacerBar />
      <RowSide>
        {players &&
          players.map((player) => (
            <>
              <PlayerCard
                name={player.name}
                photo={player.photo}
                score={player.score}
              />
            </>
          ))}
      </RowSide>
    </Card>
  );
};

PlayEnd.propTypes = {};

export default PlayEnd;
