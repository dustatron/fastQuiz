import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase";
import { fetchQuizApi } from "../../helpers";
// Components
import QuestionHeader from "../../components/QuestionHeader";
import QuestionSingle from "../../components/QuestionSingle";
import withAuth from "../../components/WithPrivateRoute";
import { SpacerBar, Spinner, RowCenter } from "../../components/Styled";

const fakeData = {
  gameTitle: "Friday Night Quiz",
};

const fakeQuestion = {
  number: 1,
  handelDelete: () => {},
  q: {
    question: "How many are there?",
    correct_answer: "1",
    incorrect_answers: ["2", "3", "4"],
  },
};

const Edit = () => {
  const [quizData, setQuizData] = useState(null);
  const [selectedRound, setSelectedRound] = useState(0);
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);

  const router = useRouter();
  const quizId = router.query.id;
  const quizRef = firebase.firestore().collection("quizDB").doc(quizId[0]);

  useEffect(() => {
    quizRef.onSnapshot((doc) => {
      const data = doc.data();
      setQuizData(data);
    });
  }, []);

  const handleUpdate = (updateObject) => {
    quizRef.set(updateObject).then(() => {
      console.log("Document successfully written!");
    });
  };

  const addQuestion = (newQuestion) => {
    const addQuestionToCurrentRoundsArray = [
      ...quizData.rounds[selectedRound].questions,
      newQuestion,
    ];
    const updatedRoundObject = {
      ...quizData.rounds[selectedRound],
      questions: addQuestionToCurrentRoundsArray,
    };
    const updatedRoundsArray = [...quizData.rounds];
    updatedRoundsArray.splice(selectedRound, 1, updatedRoundObject);

    const updateObject = { ...quizData, rounds: updatedRoundsArray };
    quizRef.set(updateObject).then(() => {
      console.log("Document successfully written!");
    });
  };

  const deleteQuestion = (qIndex) => {
    const newQuestionList = [...quizData.rounds[selectedRound].questions];
    newQuestionList.splice(qIndex, 1);
    const updateRound = {
      ...quizData.rounds[selectedRound],
      questions: newQuestionList,
    };

    const newRoundsArray = [...quizData.rounds];
    newRoundsArray.splice(selectedRound, 1, updateRound);

    const updateObject = { ...quizData, rounds: newRoundsArray };
    quizRef.set(updateObject).then(() => {
      console.log("Document successfully written!");
    });
  };

  const handleGenerate = async (params) => {
    const data = await fetchQuizApi(setIsShowingSpinner, params);

    const addQuestionToCurrentRoundsArray = [
      ...quizData.rounds[selectedRound].questions,
      ...data.results,
    ];
    const updatedRoundObject = {
      ...quizData.rounds[selectedRound],
      questions: addQuestionToCurrentRoundsArray,
    };
    const updatedRoundsArray = [...quizData.rounds];
    updatedRoundsArray.splice(selectedRound, 1, updatedRoundObject);

    const updateObject = { ...quizData, rounds: updatedRoundsArray };
    quizRef.set(updateObject).then(() => {
      console.log("Document successfully written!");
    });
  };

  return (
    <>
      {quizData && (
        <QuestionHeader
          quizData={quizData}
          update={handleUpdate}
          selectedRound={selectedRound}
          setSelectedRound={setSelectedRound}
          handleAddQuestion={addQuestion}
          handleGenerate={handleGenerate}
        />
      )}
      {!quizData && <h2>Loading...</h2>}

      <SpacerBar width={"75%"} />
      {quizData &&
        !isShowingSpinner &&
        quizData.rounds[selectedRound] &&
        quizData.rounds[selectedRound].questions.map((q, index) => (
          <QuestionSingle q={q} qIndex={index} handelDelete={deleteQuestion} />
        ))}
      {isShowingSpinner && (
        <RowCenter>
          <Spinner />
        </RowCenter>
      )}
    </>
  );
};

export default withAuth(Edit);
