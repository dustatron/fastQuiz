import React from "react";
import { CardSmall, ImageCircle, ScoreBox } from "../Styled";

const PlayerCard = ({ name, photo, score }) => {
  const correctedScore = score - 1;
  return (
    <CardSmall>
      <ImageCircle>
        <img src={photo} alt="person" />
      </ImageCircle>
      <div className="card-center">{name}</div>
      {score && (
        <ScoreBox>
          {correctedScore < 9 ? `0${correctedScore}` : correctedScore}
        </ScoreBox>
      )}
    </CardSmall>
  );
};

export default PlayerCard;
