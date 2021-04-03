import React, { useEffect, useState } from "react";
import firebase from "firebase";
import GameCard from "../components/GameCard";
import { Section } from "../components/Styled";
import withAuth from "../components/WithPrivateRoute";
import NoGames from "../components/NoGames";

const games = () => {
  const [gameList, setGameList] = useState([]);
  const auth = firebase.auth();

  useEffect(() => {
    const { uid } = auth.currentUser;
    firebase
      .firestore()
      .collection("quizDB")
      .where("authId", "==", uid)
      .onSnapshot((snapShot) => {
        const gameList = [];
        snapShot.forEach((doc) => gameList.push({ ...doc.data(), id: doc.id }));
        setGameList(gameList);
      });
  }, []);

  return (
    <Section>
      <h1>Games</h1>
      {gameList.map((game) => (
        <GameCard game={game} key={game.id} isAuthor />
      ))}
      {gameList.length <= 0 && <NoGames />}
    </Section>
  );
};

export default withAuth(games);
