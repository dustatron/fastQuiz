import React from "react";
import { CardSmall, ImageCircle, ScoreBox } from "../Styled";

const PlayerCard = ({ name, photo, score }) => {
  return (
    <CardSmall>
      <ImageCircle>
        <img src={photo} alt="person" />
      </ImageCircle>
      <div class="card-center">{name}</div>
      {score && <ScoreBox>{score}</ScoreBox>}
    </CardSmall>
  );
};

export default PlayerCard;
