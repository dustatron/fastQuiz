import React, { useState, useEffect } from "react";
import { shuffle } from "lodash";
import {
  Card,
  Button,
  Header,
  RowCenter,
  Section,
  HeaderContainer,
  Left,
  Right,
  Tab,
} from "../Styled";

import { clean } from "../../helpers";

const QuestionSingle = ({
  qIndex,
  handelDelete,
  q: { question, correct_answer, incorrect_answers },
}) => {
  const [shuffledQuestions, setDisplay] = useState([]);
  const [isShowingAnswer, setIsShowingAnswer] = useState(false);

  useEffect(() => {
    const options = [correct_answer, ...incorrect_answers];
    setDisplay(shuffle(options));
  }, [correct_answer, incorrect_answers]);

  return (
    <Section height={"1rem"} pad={"1rem 2rem"}>
      <HeaderContainer>
        <Left>
          <Tab onClick={() => handelDelete(qIndex)}>Delete </Tab>
          <Tab> Edit </Tab>
          <Tab
            active={isShowingAnswer}
            onClick={() => {
              setIsShowingAnswer(!isShowingAnswer);
            }}
          >
            Answer
          </Tab>
        </Left>
        <Right>
          <Card height={"14rem"}>
            <RowCenter>
              <Header>{clean(question)}</Header>
            </RowCenter>
            <RowCenter>
              {shuffledQuestions.map((q, index) => (
                <Button
                  white
                  margin={"10px"}
                  width={"80%"}
                  mdWidth={"90%"}
                  pad={"1.3em 2em"}
                  key={`${q[0]}-${index}`}
                  active={isShowingAnswer && correct_answer === q}
                  onClick={(e) => {
                    console.log(q);
                  }}
                >
                  {clean(q)}
                </Button>
              ))}
            </RowCenter>
          </Card>
        </Right>
      </HeaderContainer>
    </Section>
  );
};

export default QuestionSingle;
