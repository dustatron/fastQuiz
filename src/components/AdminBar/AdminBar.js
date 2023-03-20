import React, { useState, useEffect } from "react";
import { Section, Button, Card, Title, RowCenter, RowSide, StopLight } from "../Styled";
import { isEmpty } from "lodash";
import Switch from "react-switch";
import { advanceSlide, backSlide, restartGame } from "../../helpers";
import LeftArrow from "./left-arrow.svg";
import RightArrow from "./right-arrow.svg";
import UpdateArrow from "./update-arrow.svg";
import PlayButton from "./play-button.svg";
import { allPlayersHaveAnswered } from './util.ts'

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
  const [isShowingSettings, setIsSHowingSettings] = useState(false)
  const [isPublicChecked, setIsPublicChecked] = useState(false);
  const [isAutoAdvanceChecked, setIsAutoAdvanceChecked] = useState(false);

  const usersPlayed = allPlayersHaveAnswered(players, gameData.gameCurrentSlide, gameData.gamePlayable[gameData.gameCurrentSlide]?.question)
  const hasEveryoneAnswered = usersPlayed && usersPlayed?.filter((player) => player.answered === false).length === 0



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
    setIsPublicChecked(nextChecked);
    toggleIsPublic(nextChecked, gameData);
  };

  const handleAutoAdvanceChange = (nextChecked) => {
    setIsAutoAdvanceChecked(nextChecked);
    toggleIsPublic(nextChecked, gameData);
  };

  useEffect(() => {
    if (isPublic) {
      setIsPublicChecked(true);
    }
  }, []);

  useEffect(() => {
    if (isAutoAdvanceChecked && hasEveryoneAnswered && gameData.gamePlayable[gameData.gameCurrentSlide]?.type === "question") {
      advanceSlide(gameData, gameRef);
    }
  }, [hasEveryoneAnswered, gameData])

  return (
    <Section pad={"0"} height={"1rem"}>
      <Card lite>
        <RowCenter>
          <Title>Admin Panel</Title>
        </RowCenter>
        <RowCenter>
          <Button white onClick={() => setIsSHowingSettings(!isShowingSettings)}>Settings</Button>
        </RowCenter>
        {isShowingSettings && (

          <Card lite>
            <RowSide between >
              <div>
                <div>
                  <strong>Public</strong>
                </div>
                <Switch onChange={handleChange} checked={isPublicChecked} />
              </div>
              <div>
                <div>
                  <strong>Auto Advance</strong>
                </div>
                <Switch onChange={handleAutoAdvanceChange} checked={isAutoAdvanceChecked} />
              </div>

            </RowSide>

            <RowCenter>
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

            </RowCenter>

          </Card>
        )}

        <RowSide padTop={"20px"} between>

          <Button
            onClick={handleBackSlide}
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
            onClick={handleNextSlide}
            active={hasEveryoneAnswered}
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
        </RowSide>
        <RowCenter>
          {usersPlayed && usersPlayed?.map(user => (<div style={{ padding: '10px' }} key={user.id}>
            <div style={{ paddingBottom: '5px' }}>{user.name.split(' ')[0]}</div>
            <StopLight green={user.answered} > . </StopLight>
          </div>))}
        </RowCenter>
        {!isStarted &&
          <RowCenter>
            <Button
              onClick={handleStartGame}
              active
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
          </RowCenter>
        }
      </Card>
    </Section>
  );
};

export default AdminBar;
