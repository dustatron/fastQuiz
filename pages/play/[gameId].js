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
import PlayRound from "../../components/PlayRound";
import PlayQuestion from "../../components/PlayQuestion";
import PlayAnswer from "../../components/PlayAnswer";
import PlayEnd from "../../components/PlayEnd";

const play = ({ router }) => {
  const { gameId } = router.query;
  const [hostname, setHostname] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [playerData, setPlayerData] = useState(null);
  const [usersHavePlayed, setUsersHavePlayed] = useState([]);

  const user = firebase.auth().currentUser;

  const gameRef = firebase.firestore().collection("quizDB").doc(gameId);

  const playersRef = firebase
    .firestore()
    .collection(`quizDB/${gameId}/players`);

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

    playersRef
      .where("Id", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = { docId: doc.id, ...doc.data() };
          setPlayerData({ docId: doc.id, ...doc.data() });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    // playersRef.where('Id', '==', user.uid)
    // return unSubscribe;
  }, [gameData]);

  useEffect(() => {
    if (gameData && playerData) {
      playerHastakenTurn();
    }
  }, [players]);

  const playerHastakenTurn = async () => {
    const currentQuestion =
      gameData.gamePlayable[gameData.gameCurrentSlide].question;
    const isAnswer =
      gameData.gamePlayable[gameData.gameCurrentSlide].type === "answer";
    if (isAnswer) {
      console.log("answer");
      await setUsersHavePlayed([]);
    }

    if (currentQuestion && !isAnswer) {
      const havePlayed = players.map((player) => ({
        name: player.name,
        photo: player.photo,
        hasPlayed: player.theQuestion.includes(currentQuestion),
      }));
      await setUsersHavePlayed(havePlayed);
    }
  };

  const addNewUser = async () => {
    const doesNotHaveUser = await gameRef
      .collection("players")
      .where("Id", "==", user.uid)
      .get()
      .then((docs) => docs.empty);

    if (doesNotHaveUser) {
      await gameRef.collection("players").add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: user.displayName,
        Id: user.uid,
        photo: user.photoURL,
        score: 0,
        userAnswer: ["userAnswer"],
        theQuestion: ["question"],
      });
    }
  };

  const startGame = () => {
    const allRounds = gameData.rounds;
    let createGame = [];

    // Create Simple array of all questions
    for (let r = 0; r < allRounds.length; r++) {
      const thisRound = allRounds[r];
      createGame.push({ type: "round", round: thisRound.round });
      for (let q = 0; q < thisRound.questions.length; q++) {
        // question
        createGame.push({
          ...thisRound.questions[q],
          type: "question",
          round: thisRound.round,
        });

        //answer
        createGame.push({
          type: "answer",
          round: thisRound.round,
          question: thisRound.questions[q].question,
          answer: thisRound.questions[q].correct_answer,
          questionsLeftInRound: `${q + 1} of ${thisRound.questions.length}`,
        });
      }
    }
    // Update firestore
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

  const restartGame = () => {
    const updateGameData = {
      ...gameData,
      gameStarted: false,
      gameEnd: false,
      gameCurrentSlide: 0,
    };
    gameRef.set(updateGameData).then(() => {
      console.log("Game Created and set");
    });
  };

  const addUserGuess = async (userGuess, correct_answer, question) => {
    const getScore = correct_answer === correct_answer ? 1 : 0;

    const newScore = {
      ...playerData,
      score: playerData.score + getScore,
      theQuestion: [...playerData.theQuestion, question],
      userAnswer: [...playerData.userAnswer, userGuess],
    };
    setPlayerData(newScore);
    playersRef.doc(playerData.docId).set(newScore);
  };

  return (
    <>
      {!gameData?.gameStarted && (
        <Section>
          <Card>
            {gameData && <Title> Share : {gameData.quizName}</Title>}
            <Input value={`${hostname}/play/${gameId}`} />
          </Card>
          <Card lite>
            <RowCenter>
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
            <Button
              onClick={() => {
                addNewUser(gameData);
              }}
            >
              Join
            </Button>

            {gameData && user.uid === gameData.authId && (
              <Button onClick={startGame}> Start </Button>
            )}
          </RowSide>
        </Section>
      )}

      {/*/////////// SHOW GAME SLIDES ////////////////*/}
      {gameData?.gameStarted && (
        <Section>
          {/* <h2>Game Started</h2> */}
          {!gameData.gameEnd &&
            gameData.gamePlayable[gameData.gameCurrentSlide]?.type ===
              "round" && (
              <div>
                <PlayRound
                  round={
                    gameData.gamePlayable[gameData.gameCurrentSlide]?.round
                  }
                  players={players}
                  uid={user.uid}
                />
              </div>
            )}
          {!gameData.gameEnd &&
            gameData.gamePlayable[gameData.gameCurrentSlide]?.type ===
              "question" && (
              <div>
                <PlayQuestion
                  question={gameData.gamePlayable[gameData.gameCurrentSlide]}
                  count={gameData.gameCurrentSlide}
                  gameId={gameId}
                  addUserGuess={addUserGuess}
                  usersHavePlayed={usersHavePlayed}
                />
              </div>
            )}
          {!gameData.gameEnd &&
            gameData.gamePlayable[gameData.gameCurrentSlide]?.type ===
              "answer" && (
              <div>
                <PlayAnswer
                  answerData={gameData.gamePlayable[gameData.gameCurrentSlide]}
                />
              </div>
            )}

          {gameData?.gameEnd && playerData?.Id === gameData.authId && (
            <div>
              <PlayEnd players={players} />
              <Button onClick={restartGame}> Restart </Button>
            </div>
          )}
          {!gameData.gameEnd && playerData?.Id === gameData.authId && (
            <Button onClick={advanceSlide}>Next</Button>
          )}
        </Section>
      )}
    </>
  );
};

export default withAuth(withRouter(play));
