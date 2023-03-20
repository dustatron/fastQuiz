import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import firebase from "firebase";
import withAuth from "../../components/WithPrivateRoute";
import { Section, Title } from "../../components/Styled";
import { isEmpty } from "lodash";
import {
  addNewUser,
  startGame,
  addUserGuess,
  playerHasTakenTurn,
} from "../../helpers";
import PlayRound from "../../components/PlayRound";
import PlayQuestion from "../../components/PlayQuestion";
import PlayAnswer from "../../components/PlayAnswer";
import PlayEnd from "../../components/PlayEnd";
import PlayWaitingRoom from "../../components/PlayWaitingRoom";
import AdminBar from "../../components/AdminBar";

const play = ({ router }) => {
  const { gameId } = router.query;

  const user = firebase.auth().currentUser;
  const gameRef = firebase.firestore().collection("quizDB").doc(gameId);
  const playersRef = firebase
    .firestore()
    .collection(`quizDB/${gameId}/players`);

  const [hostname, setHostname] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [playerData, setPlayerData] = useState(null);
  const [usersHavePlayed, setUsersHavePlayed] = useState([]);
  const [readyToAdvance, setReadyToAdvance] = useState(false);

  /* get snapshot of current game */
  /* get window location and set it to state */
  /* add User to game and set users data to local state.  */
  useEffect(() => {
    setHostname(window.location.hostname);

    /* Get gameData */
    if (!gameData) {
      gameRef.onSnapshot((doc) => {
        const data = doc.data();
        setGameData(data);
      });
    }

    /* get all players from firebase */
    playersRef.onSnapshot((snapShot) => {
      const playerList = [];
      snapShot.forEach((doc) => playerList.push({ ...doc.data(), id: doc.id }));
      setPlayers(playerList);
    });

    /* get Active player data */
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
    if (gameData && playerData && !isEmpty(players)) {
      const params = {
        gameData,
        players,
        usersHavePlayed,
        setUsersHavePlayed,
        setReadyToAdvance,
      };
      playerHasTakenTurn(params);
    }
  }, [players]);

  const toggleIsPublic = (toggledValue, gameObj) => {
    const updateIsPublic = { ...gameObj, isPublic: toggledValue };
    const quizRef = firebase.firestore().collection("quizDB").doc(gameObj.id);
    quizRef.set(updateIsPublic);
  };

  return (
    <>
      {user.uid === gameData?.authId && (
        <AdminBar
          ready={readyToAdvance}
          startGame={startGame}
          isStarted={gameData?.gameStarted}
          isEnd={gameData?.gameEnd}
          players={players}
          gameData={gameData}
          gameRef={gameRef}
          playersRef={playersRef}
          isPublic={gameData.isPublic}
          toggleIsPublic={toggleIsPublic}
        />
      )}

      {!gameData?.gameStarted && (
        <PlayWaitingRoom
          gameData={gameData}
          user={user}
          hostname={hostname}
          gameId={gameId}
          players={players}
          playersRef={playersRef}
          addNewUser={addNewUser}
          gameRef={gameRef}
          setPlayers={setPlayers}
          setPlayerData={setPlayerData}
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
                    `roundTitle${gameData.gamePlayable[gameData.gameCurrentSlide]
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
                <Title>Slide {gameData.gameCurrentSlide} of  {gameData.gamePlayable.length}</Title>

                <PlayQuestion
                  question={gameData.gamePlayable[gameData.gameCurrentSlide]}
                  count={gameData.gameCurrentSlide}
                  gameId={gameId}
                  addUserGuess={addUserGuess}
                  usersHavePlayed={usersHavePlayed}
                  playerData={playerData}
                  setPlayerData={setPlayers}
                  playersRef={playersRef}
                  gameData={gameData}
                />
              </>
            )}
          {!gameData.gameEnd &&
            gameData.gamePlayable[gameData.gameCurrentSlide]?.type ===
            "answer" && (
              <div>
                <Title>Slide {gameData.gameCurrentSlide} of  {gameData.gamePlayable.length}</Title>

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
