import React from "react";
import { useRouter } from "next/router";
import firebase from "firebase";
import {
  Card,
  Title,
  Button,
  ButtonShy,
  RowSpacedOut,
  RowSide,
  Detail,
} from "../Styled";

const GameCard = ({ game: { quizName, rounds, createdAt, id } }) => {
  const router = useRouter();
  const quizDBRef = firebase.firestore().collection("quizDB");

  const getQuestionsAmount = () => {
    return rounds.reduce((total, current) => {
      return current.questions.length + total;
    }, 0);
  };

  const handleDelete = () => {
    const results = confirm("You want to delete this game?");
    if (results) {
      quizDBRef
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }
  };

  return (
    <Card lite>
      <RowSpacedOut top sm={"space-between"}>
        <Title justify="left" left>
          {quizName}
        </Title>
        <ButtonShy onClick={handleDelete}>🗑</ButtonShy>
      </RowSpacedOut>
      <RowSpacedOut bottom>
        <RowSide sm={"flex-start"}>
          <Detail marginR={"5px"} borderR>
            Questions: {getQuestionsAmount()}
          </Detail>
          <Detail marginR={"5px"} borderR>
            {rounds.length <= 1 ? "Round" : "Rounds"}:
            {rounds.length > 0 && rounds.length}
          </Detail>
          <Detail>
            Created: {createdAt.toDate().toLocaleTimeString("en-US")}
          </Detail>
        </RowSide>
        <RowSide end>
          <Button
            margin={"5px"}
            onClick={() => {
              router.push(`/edit/${id}`);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              router.push(`/play/${id}`);
            }}
            margin={"5px"}
          >
            Play
          </Button>
        </RowSide>
      </RowSpacedOut>
    </Card>
  );
};

export default GameCard;
