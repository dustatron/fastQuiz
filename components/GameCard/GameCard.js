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

  const handleDelete = () => {
    quizDBRef
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <Card lite>
      <RowSpacedOut top>
        <Title justify="left" left>
          {quizName}
        </Title>
        <ButtonShy onClick={handleDelete}>🗑</ButtonShy>
      </RowSpacedOut>
      <RowSpacedOut bottom>
        <RowSide>
          <Detail marginR={"5px"} borderR>
            Questions: coming soon
          </Detail>
          <Detail marginR={"5px"} borderR>
            Rounds: {rounds.length}
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
          <Button margin={"5px"}>Play</Button>
        </RowSide>
      </RowSpacedOut>
    </Card>
  );
};

export default GameCard;
