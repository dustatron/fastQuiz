import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Header, RowCenter, Title, SpacerBar } from "../Styled";

const PlayEnd = ({ players }) => {
  return (
    <RowCenter>
      <Header>Game Over</Header>
      <SpacerBar />
      {players &&
        players.map((player) => (
          <div>
            <h3>{player.name}</h3>
            <img src={player.photo} alt="author" />
            score : {player.score}
          </div>
        ))}
    </RowCenter>
  );
};

PlayEnd.propTypes = {};

export default PlayEnd;
