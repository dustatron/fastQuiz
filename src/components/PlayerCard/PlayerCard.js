import React from "react";
import { CardSmall, ImageCircle, ScoreBox } from "../Styled";

const PlayerCard = ({ name, photo, score, correct, answer }) => {
  const correctedScore = score - 1;
  return (
    <CardSmall>
      <ImageCircle>
        <img src={photo} alt="person" />
      </ImageCircle>
      <div className="card-center">
        {name && name}
        {answer && (
          <div>
            <h3>Answered:</h3>
            <div>{answer}</div>
          </div>
        )}
      </div>
      {score && (
        <ScoreBox>
          {correctedScore < 9 ? `0${correctedScore}` : correctedScore}
        </ScoreBox>
      )}
      {correct && <ScoreBox>{correct && ` + ${correct - 1}`}</ScoreBox>}
    </CardSmall>
  );
};

export default PlayerCard;
