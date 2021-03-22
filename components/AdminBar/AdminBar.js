import React from "react";
import { Section, Button, Card, Title, RowCenter } from "../Styled";
import LeftArrow from "./left-arrow.svg";
import RightArrow from "./right-arrow.svg";
import UpdateArrow from "./update-arrow.svg";
import PlayButton from "./play-button.svg";
import { isEmpty } from "lodash";

const AdminBar = ({
  nextSlide,
  backSlide,
  restart,
  ready,
  startGame,
  isStarted,
  isEnd,
  players,
}) => {
  return (
    <Section pad={"0"} height={"1rem"}>
      <Card lite>
        <Title>Admin Panel</Title>
        <RowCenter padTop={"20px"}>
          <Button
            onClick={backSlide}
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
            onClick={restart}
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
            onClick={startGame}
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
            onClick={nextSlide}
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
