import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  RowSpacedOut,
  RowSide,
  Button,
  Header,
  Card,
  RowCenter,
  ButtonShy,
  ButtonAdd,
  Tab,
  Section,
  Top,
  Left,
  Right,
  HeaderContainer,
  Title,
  Input,
  RoundTitleBox,
} from "../Styled";
import QuestionsGenerate from "../QuestionsGenerate";
import QuestionsCustom from "../QuestionsCustom";

const QuestionHeader = ({
  quizData,
  update,
  selectedRound,
  setSelectedRound,
  handleAddQuestion,
  handleGenerate,
  handleRoundTitle,
}) => {
  const [showing, setShowing] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [roundTitle, setRoundTitle] = useState("");

  const { quizName, rounds } = quizData;
  const router = useRouter();

  useEffect(() => {
    setRoundTitle(quizData[`roundTitle${selectedRound}`]);
  }, [selectedRound]);

  const addRound = () => {
    let newRounds = [];
    if (rounds.length === 0) {
      newRounds = [{ round: 1, questions: [] }];
    }
    if (rounds.length > 0) {
      newRounds = [
        ...rounds,
        { round: rounds[rounds.length - 1].round + 1, questions: [] },
      ];
    }
    const newRoundTitle = `Round ${rounds.length + 1}`;

    const newObject = {
      ...quizData,
      rounds: newRounds,
      [`roundTitle${rounds.length}`]: newRoundTitle,
    };
    update(newObject);
    setIsEditing(false);
    setRoundTitle(newRoundTitle);
    setSelectedRound(rounds.length);
  };

  const removeRound = () => {
    let result = confirm("Are you sure you would like to delete this round?");
    if (result) {
      const newRounds = [...rounds];
      newRounds.splice(selectedRound, 1);
      const newObject = { ...quizData, rounds: newRounds };
      update(newObject);
      setSelectedRound(0);
    }
  };

  const editRoundTitle = () => {
    if (isEditing && quizData[`roundTitle${selectedRound}`] !== roundTitle) {
      handleRoundTitle(roundTitle, selectedRound);
    }
    setIsEditing(!isEditing);
  };

  return (
    <Section pad={"1rem"} height={"unset"}>
      <HeaderContainer>
        <Top className="top">
          <RowSide end padTop={"2rem"} md={"center"}>
            <Button
              onClick={() => {
                router.push(`/play/${quizData.id}`);
              }}
            >
              Play
            </Button>
          </RowSide>
        </Top>

        <Left className="left">
          <ButtonShy
            onClick={removeRound}
            size={"1.6rem"}
            margin={"10px auto"}
            marginIpad={"5px"}
          >
            🗑
          </ButtonShy>
          {rounds &&
            rounds.map((round, index) => {
              return (
                <Tab
                  onClick={() => {
                    setSelectedRound(index);
                    setRoundTitle(quizData[`roundTitle${index}`]);
                  }}
                  active={index === selectedRound}
                >
                  Round {round.round}
                </Tab>
              );
            })}
          <ButtonAdd onClick={addRound}>+</ButtonAdd>
        </Left>
        <Right className="right">
          <RowCenter>
            <Title dark> {quizName} Quiz </Title>
          </RowCenter>
          <Card>
            <RowSpacedOut top>
              <RoundTitleBox>
                <ButtonShy onClick={editRoundTitle}>⚙️</ButtonShy>
                {isEditing ? (
                  <Input
                    value={roundTitle}
                    onBlur={editRoundTitle}
                    onChange={(e) => {
                      setRoundTitle(e.target.value);
                    }}
                  />
                ) : (
                  <Header>{roundTitle}</Header>
                )}
              </RoundTitleBox>
              <div>
                <Button
                  white
                  active={showing === 0 && true}
                  onClick={() => {
                    setShowing(0);
                  }}
                >
                  Auto Questions
                </Button>
                |
                <Button
                  white
                  active={showing === 1 && true}
                  onClick={() => {
                    setShowing(1);
                  }}
                >
                  Custom Question
                </Button>
              </div>
            </RowSpacedOut>
            {showing === 0 && (
              <QuestionsGenerate handleGenerate={handleGenerate} />
            )}
            {showing === 1 && (
              <QuestionsCustom handleAddQuestion={handleAddQuestion} />
            )}
          </Card>
        </Right>
      </HeaderContainer>
    </Section>
  );
};

export default QuestionHeader;
