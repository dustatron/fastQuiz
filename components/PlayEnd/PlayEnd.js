import React from "react";
import PropTypes from "prop-types";
import PlayerCard from "../PlayerCard";
import {
  Card,
  Button,
  Header,
  RowSide,
  Title,
  SpacerBar,
  RowSpacedOut,
} from "../Styled";

const PlayEnd = ({ players, totalPoints }) => {
  return (
    <Card lite>
      <RowSpacedOut>
        <Header>Game Over</Header>
        <Title>Max Possible Points: {totalPoints}</Title>
      </RowSpacedOut>
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
