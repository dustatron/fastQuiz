import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import firebase from "firebase";
import withAuth from "../../components/WithPrivateRoute";
import {
  Section,
  Card,
  Title,
  Input,
  RowCenter,
  Button,
  RowSide,
} from "../../components/Styled";
import QuestionSingle from "../../components/QuestionSingle";

const play = ({ router }) => {
  const { gameId } = router.query;
  const [hostname, setHostname] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [players, setPlayers] = useState([]);

  const { uid, displayName, photoURL } = firebase.auth().currentUser;

  const gameRef = firebase.firestore().collection("quizDB").doc(gameId);

  const playersRef = firebase
    .firestore()
    .collection(`quizDB/${gameId}/players`);

  const hasUserJoined = async () => {
    const doesNotHaveUser = await gameRef
      .collection("players")
      .where("Id", "==", uid)
      .get()
      .then((docs) => docs.empty);

    if (uid !== gameData.authId && doesNotHaveUser) {
      return false;
    }
    return true;
  };

  const addNewUser = async (game) => {
    if (!hasUserJoined(game)) {
      await gameRef.collection("players").add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: displayName,
        Id: uid,
        photo: photoURL,
        score: 0,
      });
    }
  };

  /* get snapshot of current game */
  /* get window location and set it to state */
  useEffect(() => {
    setHostname(window.location.hostname);

    let unSubscribe;
    if (!gameData) {
      unSubscribe = gameRef.onSnapshot((doc) => {
        const data = doc.data();
        setGameData(data);
      });
    }
    // return unSubscribe;
  }, [gameData]);

  /* add User to game and set users data to local state.  */
  useEffect(() => {
    // if (gameData) {
    //   addNewUser(gameData);
    // }
    const unSubscribe = playersRef.onSnapshot((snapShot) => {
      const playerList = [];
      snapShot.forEach((doc) => playerList.push({ ...doc.data(), id: doc.id }));
      setPlayers(playerList);
    });

    return unSubscribe;
  }, [gameData]);

  const startGame = () => {
    const allRounds = gameData.rounds;
    let createGame = [];

    // Create Simple array of all questions
    for (let r = 0; r < allRounds.length; r++) {
      const thisRound = allRounds[r];
      createGame.push({ type: "round", round: thisRound.round });
      for (let q = 0; q < thisRound.questions.length; q++) {
        createGame.push({
          ...thisRound.questions[q],
          type: "question",
          round: q + 1,
        });
      }
    }

    const updateGameData = {
      ...gameData,
      gamePlayable: createGame,
      gameStarted: true,
      gameEnd: false,
      gameCurrentSlide: 0,
    };
    gameRef.set(updateGameData).then(() => {
      console.log("Game Created and set");
    });
  };

  const advanceSlide = () => {
    const netSlide = gameData.gameCurrentSlide + 1;
    if (netSlide >= gameData.gamePlayable.length) {
      return gameRef.set({ ...gameData, gameEnd: true });
    }
    return gameRef.set({ ...gameData, gameCurrentSlide: netSlide }).then(() => {
      console.log("next slide");
    });
  };

  return (
    <>
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

        <RowSide end>
          {gameData && !hasUserJoined() && (
            <Button
              onClick={() => {
                addNewUser(gameData);
              }}
            >
              Join
            </Button>
          )}

          {gameData && uid === gameData.authId && (
            <Button onClick={startGame}> Start </Button>
          )}
        </RowSide>
      </Section>

      {/*/////////// SHOW GAME SLIDES ////////////////*/}
      {gameData?.gameStarted && (
        <Section>
          <h2>Game Started</h2>
          {!gameData.gameEnd &&
            gameData.gamePlayable[gameData.gameCurrentSlide]?.type ===
              "round" && (
              <div>
                Round {gameData.gamePlayable[gameData.gameCurrentSlide]?.round}
              </div>
            )}
          {!gameData.gameEnd &&
            gameData.gamePlayable[gameData.gameCurrentSlide]?.type ===
              "question" && (
              <div>
                {gameData.gamePlayable[gameData.gameCurrentSlide]?.question}
              </div>
            )}

          {gameData?.gameEnd && <div> Game over</div>}
          {!gameData.gameEnd && <Button onClick={advanceSlide}>Next</Button>}
        </Section>
      )}
    </>
  );
};

export default withAuth(withRouter(play));
