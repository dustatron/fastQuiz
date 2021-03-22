import React from "react";
import { find, isEmpty } from "lodash";
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
  hostname,
  gameId,
  players,
  addNewUser,
  user,
}) => {
  return (
    <Section>
      <Card>
        {gameData && <Title> Share : {gameData.quizName}</Title>}
        <Input value={`https://${hostname}/play/${gameId}`} />
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

      <RowSide end>
        {players && !find(players, ["Id", user.uid]) && (
          <div>
            <Button
              onClick={() => {
                addNewUser(gameData);
              }}
            >
              Join
            </Button>
          </div>
        )}
      </RowSide>
    </Section>
  );
};

export default PlayWaitingRoom;
