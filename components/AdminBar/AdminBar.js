import React, { useState, useEffect } from "react";
import { Section, Button, Card, Title, RowCenter, RowSide } from "../Styled";
import { isEmpty } from "lodash";
import Switch from "react-switch";
import { advanceSlide, backSlide, restartGame } from "../../helpers";
import LeftArrow from "./left-arrow.svg";
import RightArrow from "./right-arrow.svg";
import UpdateArrow from "./update-arrow.svg";
import PlayButton from "./play-button.svg";

const AdminBar = ({
  ready,
  startGame,
  isStarted,
  isEnd,
  players,
  gameData,
  gameRef,
  playersRef,
  isPublic,
  toggleIsPublic,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isPublic) {
      setChecked(true);
    }
  }, []);

  const handleBackSlide = () => {
    backSlide(gameData, gameRef);
  };

  const handleNextSlide = () => {
    advanceSlide(gameData, gameRef);
  };

  const handleStartGame = () => {
    startGame(gameData, gameRef);
  };

  const handleRestartGame = () => {
    restartGame(gameData, gameRef, playersRef);
  };

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    toggleIsPublic(nextChecked, gameData);
  };

  return (
    <Section pad={"0"} height={"1rem"}>
      <Card lite>
        <Title>Admin Panel</Title>
        <RowSide>
          <div>
            <div>
              <strong>Public</strong>
            </div>
            <Switch onChange={handleChange} checked={checked} />
          </div>
        </RowSide>
        <RowCenter padTop={"20px"}>
          <Button
            onClick={handleBackSlide}
            active={isStarted && !isEnd}
            margin={"0 10px"}
            disabled={isEnd || !isStarted}
          >
            <img
              style={{ marginRight: "10px" }}
              height="10px"
              src={LeftArrow}
              alt="left arrow"
            />
            back
          </Button>
          <Button
            onClick={handleRestartGame}
            active={isEnd}
            margin={"0 10px"}
            disabled={isEmpty(players)}
          >
            Restart
            <img
              style={{ marginLeft: "10px" }}
              height="10px"
              src={UpdateArrow}
              alt="right arrow"
            />
          </Button>
          <Button
            onClick={handleStartGame}
            active={!isStarted && !isEmpty(players)}
            margin={"0 10px"}
            disabled={isEnd || isEmpty(players)}
          >
            Start Game
            <img
              style={{ marginLeft: "10px" }}
              height="1px"
              src={PlayButton}
              alt="right arrow"
            />
          </Button>
          <Button
            onClick={handleNextSlide}
            active={ready && !isEmpty(players) && isStarted}
            disabled={isEnd || !isStarted}
            margin={"0 10px"}
          >
            Next
            <img
              style={{ marginLeft: "10px" }}
              height="10px"
              src={RightArrow}
              alt="right arrow"
            />
          </Button>
        </RowCenter>
      </Card>
    </Section>
  );
};

export default AdminBar;
