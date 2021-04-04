import { useState, useEffect } from "react";
import firebase from "firebase";
import { isEmpty } from "lodash";
import GameCard from "../components/GameCard";
import {
  RowCenter,
  TitleLarge,
  Title,
  Section,
  SpacerBar,
  Card,
} from "../components/Styled";

export default function Home() {
  const [gameList, setGameList] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("quizDB")
      .where("isPublic", "==", true)
      .onSnapshot((snapShot) => {
        const gameList = [];
        snapShot.forEach((doc) => gameList.push({ ...doc.data(), id: doc.id }));
        setGameList(gameList);
      });
  }, []);
  return (
    <Section>
      <TitleLarge dark>
        Welcome to Fast<strong>Quiz</strong>
      </TitleLarge>
      <SpacerBar />
      <RowCenter>Make and share quiz games within minutes.</RowCenter>
      {/* <SpacerBar /> */}
      <Card>
        <Title>Public Games</Title>
        <SpacerBar white />
        {/* <RowCenter> */}
        <div>
          {!isEmpty(gameList) &&
            gameList.map((game) => <GameCard game={game} key={game.id} />)}
        </div>
        <div>
          {isEmpty(gameList) && <RowCenter> "No Public Games"</RowCenter>}
        </div>
      </Card>
    </Section>
  );
}
