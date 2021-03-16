import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import firebase from "firebase";
import {
  Section,
  Card,
  Title,
  Input,
  RowCenter,
} from "../../components/Styled";

const play = ({ router }) => {
  const { gameId } = router.query;
  const [hostname, setHostname] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [players, setPlayers] = useState([]);

  const gameRef = firebase.firestore().collection("quizDB").doc(gameId);
  const playersRef = firebase
    .firestore()
    .collection(`quizDB/${gameId}/players`);

  const addNewUser = async (game) => {
    const { uid, displayName, photoURL } = firebase.auth().currentUser;
    const doesNotHaveUser = await gameRef
      .collection("players")
      .where("Id", "==", uid)
      .get()
      .then((docs) => docs.empty);
    console.log("hasUser", doesNotHaveUser);
    if (uid !== game.authId && doesNotHaveUser) {
      await gameRef.collection("players").add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: displayName,
        Id: uid,
        photo: photoURL,
        score: 0,
      });
    }
  };

  useEffect(() => {
    let unSubscribe;
    if (!gameData) {
      unSubscribe = gameRef.onSnapshot((doc) => {
        const data = doc.data();
        setGameData(data);
      });
    }
    return unSubscribe;
  }, [gameRef]);

  useEffect(() => {
    setHostname(window.location.hostname);
    if (gameData) {
      addNewUser(gameData);
    }
    const unSubscribe = playersRef.onSnapshot((snapShot) => {
      const playerList = [];
      snapShot.forEach((doc) => playerList.push({ ...doc.data(), id: doc.id }));
      setPlayers(playerList);
    });

    return unSubscribe;
  }, [gameData]);

  return (
    <Section>
      <Card>
        {gameData && <Title> Share : {gameData.quizName}</Title>}
        <Input value={`${hostname}/play/${gameId}`} />
      </Card>
      <Card lite>
        <RowCenter>
          <div>
            <h3>{gameData && gameData.authName}</h3>
            {gameData && <img src={gameData.authPhoto} alt="author" />}
          </div>
          {players &&
            players.map((player) => (
              <div>
                <h3>{player.name}</h3>
                <img src={player.photo} alt="author" />
              </div>
            ))}
        </RowCenter>
      </Card>
    </Section>
  );
};

export default withRouter(play);
