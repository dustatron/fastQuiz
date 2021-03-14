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

const QuestionHeader = ({ title }) => {
  const [showing, setShowing] = useState(0);
  return (
    <Section pad={"1rem 2rem"}>
      <HeaderContainer>
        <Top className="top">
          <RowSpacedOut center padTop={"2rem"}>
            <Header>{title}</Header>
            <Button>Start</Button>
          </RowSpacedOut>
          <RowCenter>
            <Header> Add Question </Header>
          </RowCenter>
        </Top>

        <Left className="left">
          <ButtonShy size={"1.6rem"} margin={"10px auto"}>
            🗑
          </ButtonShy>
          <Tab active> Round 1 </Tab>
          <Tab> Round 2 </Tab>
          <ButtonAdd>+</ButtonAdd>
        </Left>
        <Right className="right">
          <Card>
            <RowSpacedOut top>
              <div>
                <Header>History</Header>
                Round 1 Name
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
            {showing === 0 && <QuestionsGenerate />}
            {showing === 1 && <QuestionsCustom />}
          </Card>
        </Right>
      </HeaderContainer>
    </Section>
  );
};

export default QuestionHeader;
