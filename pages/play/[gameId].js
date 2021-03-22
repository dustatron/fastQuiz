import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import firebase from "firebase";
import withAuth from "../../components/WithPrivateRoute";
import { Section, Button, RowSpacedOut } from "../../components/Styled";
import PlayRound from "../../components/PlayRound";
import PlayQuestion from "../../components/PlayQuestion";
import PlayAnswer from "../../components/PlayAnswer";
import PlayEnd from "../../components/PlayEnd";
import PlayWaitingRoom from "../../components/PlayWaitingRoom";
import AdminBar from "../../components/AdminBar";

const play = ({ router }) => {
  const { gameId } = router.query;
  const [hostname, setHostname] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [playerData, setPlayerData] = useState(null);
  const [usersHavePlayed, setUsersHavePlayed] = useState([]);
  const [readyToAdvance, setReadyToAdvance] = useState(false);

  const user = firebase.auth().currentUser;
  const gameRef = firebase.firestore().collection("quizDB").doc(gameId);

  const playersRef = firebase
    .firestore()
    .collection(`quizDB/${gameId}/players`);

  /* get snapshot of current game */
  /* get window location and set it to state */
  /* add User to game and set users data to local state.  */
  useEffect(() => {
    setHostname(window.location.hostname);

    // if (gameData) {
    //   addNewUser(gameData);
    // }

    if (!gameData) {
      gameRef.onSnapshot((doc) => {
        const data = doc.data();
        setGameData(data);
      });
    }

    playersRef.onSnapshot((snapShot) => {
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
    const isRound =
      gameData.gamePlayable[gameData.gameCurrentSlide].type === "round";

    if (isAnswer || isRound) {
      console.log("answer");
      await setUsersHavePlayed([]);
      return setReadyToAdvance(true);
    }

    if (currentQuestion && !isAnswer) {
      const havePlayed = players.map((player) => ({
        name: player.name,
        photo: player.photo,
        hasPlayed: player.theQuestion.includes(currentQuestion),
      }));
      await setUsersHavePlayed(havePlayed);
    }
    const allUsersHavePlayed = usersHavePlayed.reduce((answer, el) => {
      if (el.hasPlayed) {
        return answer;
      }
      return false;
    }, true);

    if (allUsersHavePlayed && usersHavePlayed.length >= 1) {
      return setReadyToAdvance(true);
    }
    return setReadyToAdvance(false);
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
        score: 1,
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
    const totalPoints = gameData.rounds.reduce((total, current) => {
      return current.questions.length + total;
    }, 0);
    // Update firestore
    const updateGameData = {
      ...gameData,
      gamePlayable: createGame,
      gameStarted: true,
      gameEnd: false,
      totalPoints: totalPoints,
      gameCurrentSlide: 0,
    };
    gameRef.set(updateGameData).then(() => {
      console.log("Game Created and set");
    });
  };

  const advanceSlide = () => {
    const nextSlide = gameData.gameCurrentSlide + 1;
    if (nextSlide >= gameData.gamePlayable.length) {
      return gameRef.set({ ...gameData, gameEnd: true });
    }
    return gameRef
      .set({ ...gameData, gameCurrentSlide: nextSlide })
      .then(() => {
        console.log("next slide");
      });
  };

  const backSlide = async () => {
    const backSlide = gameData.gameCurrentSlide - 1;
    console.log(backSlide);
    if (backSlide > 0) {
      return await gameRef
        .set({ ...gameData, gameCurrentSlide: backSlide })
        .then(() => {
          console.log("Back slide");
        });
    }
  };

  const restartGame = () => {
    const updateGameData = {
      ...gameData,
      gameStarted: false,
      gameEnd: false,
      gameCurrentSlide: 0,
    };
    gameRef.set(updateGameData).then(() => {
      console.log("Game has been restarted");
    });

    playersRef.get().then((snapShop) =>
      snapShop.forEach((player) => {
        playersRef.doc(player.id).delete();
      })
    );
  };

  const addUserGuess = async (userGuess, correct_answer, question) => {
    const getScore = correct_answer === userGuess ? 1 : 0;

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
      {user.uid === gameData?.authId && (
        <AdminBar
          nextSlide={advanceSlide}
          backSlide={backSlide}
          restart={restartGame}
          ready={readyToAdvance}
          startGame={startGame}
          isStarted={gameData?.gameStarted}
          isEnd={gameData?.gameEnd}
          players={players}
        />
      )}

      {!gameData?.gameStarted && (
        <PlayWaitingRoom
          gameData={gameData}
          user={user}
          hostname={hostname}
          gameId={gameId}
          players={players}
          addNewUser={addNewUser}
          user={user}
        />
      )}

      {/*/////////// SHOW GAME SLIDES ////////////////*/}
      {gameData?.gameStarted && (
        <Section>
          {!gameData.gameEnd &&
            gameData.gamePlayable[gameData.gameCurrentSlide]?.type ===
              "round" && (
              <div>
                <PlayRound
                  round={
                    gameData.gamePlayable[gameData.gameCurrentSlide]?.round
                  }
                  players={players}
                  title={
                    gameData[
                      `roundTitle${
                        gameData.gamePlayable[gameData.gameCurrentSlide]
                          ?.round - 1
                      }`
                    ]
                  }
                />
              </div>
            )}

          {/* SLIDES  */}
          {!gameData.gameEnd &&
            gameData.gamePlayable[gameData.gameCurrentSlide]?.type ===
              "question" && (
              <>
                <PlayQuestion
                  question={gameData.gamePlayable[gameData.gameCurrentSlide]}
                  count={gameData.gameCurrentSlide}
                  gameId={gameId}
                  addUserGuess={addUserGuess}
                  usersHavePlayed={usersHavePlayed}
                />
              </>
            )}
          {!gameData.gameEnd &&
            gameData.gamePlayable[gameData.gameCurrentSlide]?.type ===
              "answer" && (
              <div>
                <PlayAnswer
                  answerData={gameData.gamePlayable[gameData.gameCurrentSlide]}
                  players={players}
                  currentSlide={gameData.gameCurrentSlide}
                />
              </div>
            )}
          {gameData?.gameEnd && playerData?.Id === gameData.authId && (
            <div>
              <PlayEnd players={players} totalPoints={gameData.totalPoints} />
            </div>
          )}
        </Section>
      )}
    </>
  );
};

export default withAuth(withRouter(play));
