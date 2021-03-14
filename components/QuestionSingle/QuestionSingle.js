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
  RowSpacedOut,
} from "../Styled";

import { clean } from "../../helpers";

const QuestionSingle = ({
  number,
  handelDelete,
  q: { question, correct_answer, incorrect_answers },
}) => {
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    const options = [correct_answer, ...incorrect_answers];
    setDisplay(shuffle(options));
  }, [correct_answer, incorrect_answers]);

  return (
    <Section height={"1rem"} pad={"1rem 2rem"}>
      <HeaderContainer>
        <Left>
          <Tab active> Delete </Tab>
          <Tab active> Edit </Tab>
          <Tab active> Answers </Tab>
        </Left>
        <Right>
          <Card height={"14rem"}>
            <Header>{question}</Header>
            <RowCenter>
              {display.map((q, index) => (
                <Button
                  white
                  margin={"10px"}
                  width={"80%"}
                  pad={"1.3em 2em"}
                  key={`${q[0]}-${index}`}
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
