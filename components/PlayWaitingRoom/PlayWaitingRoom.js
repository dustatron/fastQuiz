import React from "react";
import { isEmpty } from "lodash";
import PlayerCard from "../PlayerCard";
import {
  Section,
  Card,
  Title,
  Input,
  RowSide,
  RowCenter,
  Button,
  RowSpacedOut,
} from "../Styled";
import PlayAnswer from "../PlayAnswer";

const PlayWaitingRoom = ({
  gameData,
  user,
  hostname,
  gameId,
  players,
  startGame,
  addNewUser,
}) => {
  return (
    <Section>
      <Card>
        {gameData && <Title> Share : {gameData.quizName}</Title>}
        <Input value={`http://${hostname}/play/${gameId}`} />
        <Button
          white
          onClick={() => {
            navigator.clipboard.writeText(`http://${hostname}/play/${gameId}`);
          }}
        >
          Copy
        </Button>
      </Card>
      <Card lite textLeft pad={"1rem 2rem"}>
        {isEmpty(players) && (
          <RowCenter>
            <Title>Join game</Title>
          </RowCenter>
        )}
        <RowSide>
          {players &&
            players.map((player) => (
              <PlayerCard name={player.name} photo={player.photo} />
            ))}
        </RowSide>
      </Card>

      <RowSpacedOut>
        <div>
          {gameData && user.uid === gameData.authId && (
            <Button onClick={startGame}> Start </Button>
          )}
        </div>
        <div>
          <Button
            onClick={() => {
              addNewUser(gameData);
            }}
          >
            Join
          </Button>
        </div>
      </RowSpacedOut>
    </Section>
  );
};

export default PlayWaitingRoom;
