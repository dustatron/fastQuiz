import React, { useState } from "react";
import {
  RowSpacedOut,
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
}) => {
  const { quizName, rounds } = quizData;
  const [showing, setShowing] = useState(0);

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
    const newObject = { ...quizData, rounds: newRounds };
    update(newObject);
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

  return (
    <Section pad={"1rem"} height={"unset"}>
      <HeaderContainer>
        <Top className="top">
          <RowSpacedOut center padTop={"2rem"}>
            <Header>{quizName}</Header>
            <Button>Start</Button>
          </RowSpacedOut>
          <RowCenter>
            <Header> Add Question </Header>
          </RowCenter>
        </Top>

        <Left className="left">
          <ButtonShy onClick={removeRound} size={"1.6rem"} margin={"10px auto"}>
            🗑
          </ButtonShy>
          {rounds &&
            rounds.map((round, index) => {
              return (
                <Tab
                  onClick={() => {
                    setSelectedRound(index);
                  }}
                  active={index === selectedRound}
                >
                  {" "}
                  Round {round.round}{" "}
                </Tab>
              );
            })}
          <ButtonAdd onClick={addRound}>+</ButtonAdd>
        </Left>
        <Right className="right">
          <Card>
            <RowSpacedOut top>
              <div>
                <Header>
                  Round{" "}
                  {quizData.rounds[selectedRound] &&
                    rounds[selectedRound].round}
                </Header>
                Round{" "}
                {quizData.rounds[selectedRound] && rounds[selectedRound].round}{" "}
                Name
              </div>
              <div>
                <ButtonShy
                  white
                  active={showing === 0 && true}
                  onClick={() => {
                    setShowing(0);
                  }}
                >
                  Generate
                </ButtonShy>
                |
                <ButtonShy
                  white
                  active={showing === 1 && true}
                  onClick={() => {
                    setShowing(1);
                  }}
                >
                  Custom Question
                </ButtonShy>
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
