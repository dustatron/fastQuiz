import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase";
import Switch from "react-switch";
import {
  Card,
  Title,
  Button,
  ButtonShy,
  RowSpacedOut,
  RowSide,
  Detail,
  Header,
} from "../Styled";

const GameCard = ({ game, isAuthor, toggleIsPublic }) => {
  const { quizName, rounds, createdAt, id, isPublic, authName } = game;
  const router = useRouter();
  const quizDBRef = firebase.firestore().collection("quizDB");

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isPublic) {
      setChecked(true);
    }
  }, []);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    toggleIsPublic(nextChecked, game);
  };

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
        {isAuthor && <ButtonShy onClick={handleDelete}>🗑</ButtonShy>}
        {!isAuthor && <strong> Created by: {authName.split(" ")[0]}</strong>}
      </RowSpacedOut>
      {isAuthor && (
        <RowSide>
          <div>
            <div>
              <strong>Public</strong>
            </div>
            <Switch onChange={handleChange} checked={checked} />
          </div>
        </RowSide>
      )}

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
          {isAuthor && (
            <Button
              margin={"5px"}
              onClick={() => {
                router.push(`/edit/${id}`);
              }}
            >
              Edit
            </Button>
          )}
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
