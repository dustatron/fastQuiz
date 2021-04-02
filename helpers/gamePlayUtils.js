import firebase from "firebase";
import { isEmpty, isArrayLike } from "lodash";

export const addNewUser = async (gameRef, user) => {
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

export const startGame = (gameData, gameRef) => {
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

export const restartGame = (gameData, gameRef, playersRef) => {
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

export const addUserGuess = async ({
  userGuess,
  question,
  playerData,
  setPlayerData,
  playersRef,
  correctAnswer,
}) => {
  const getScore = correctAnswer === userGuess ? 1 : 0;

  const newScore = {
    ...playerData,
    score: playerData.score + getScore,
    theQuestion: [...playerData.theQuestion, question],
    userAnswer: [...playerData.userAnswer, userGuess],
  };
  setPlayerData(newScore);
  playersRef.doc(playerData.docId).set(newScore);
};

export const playerHasTakenTurn = async ({
  gameData,
  players,
  usersHavePlayed,
  setUsersHavePlayed,
  setReadyToAdvance,
}) => {
  const isQuestion = isCurrentSlideAQuestion(gameData);

  /* check if current slide is a answer or round*/
  if (!isQuestion) {
    await setUsersHavePlayed([]);
    return setReadyToAdvance(true);
  }

  if (isQuestion && isArrayLike(players)) {
    await setUsersHavePlayed(
      players.map((player) => ({
        name: player.name,
        photo: player.photo,
        hasPlayed: player.theQuestion.includes(getCurrentQuestion(gameData)),
      }))
    );
  }

  return setReadyToAdvance(haveAllUsersMadeAGuess(usersHavePlayed));
};

function isCurrentSlideAQuestion(gameData) {
  const { type } = gameData.gamePlayable[gameData.gameCurrentSlide];
  return type === "question" ? true : false;
}

function getCurrentQuestion(gameData) {
  return gameData.gamePlayable[gameData.gameCurrentSlide].question;
}

function haveAllUsersMadeAGuess(usersHavePlayed) {
  const result = usersHavePlayed.reduce((answer, el) => {
    if (el.hasPlayed) {
      return answer;
    }
    return false;
  }, true);

  return result;
}
