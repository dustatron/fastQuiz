import React from "react";
import {
  Section,
  RowSpacedOut,
  Button,
  Header,
  Card,
  Input,
  RowSide,
  FormGroup,
  Tab,
  RowCenter,
} from "../components/Styled";

const fakeData = {
  gameTitle: "Friday Night Quiz",
};

const make = () => {
  const { gameTitle } = fakeData;
  return (
    <>
      <Section height={"1rem"} pad={"0"}>
        <RowSpacedOut center padTop={"2rem"}>
          <Header>{gameTitle}</Header>
          <Button>Start</Button>
        </RowSpacedOut>
      </Section>
      <Section pad={"1rem 4rem"}>
        <RowCenter>
          <Header> Add Question </Header>
        </RowCenter>
        <Card>
          <RowSpacedOut top>
            <div>
              <Header>History</Header>
              Round 1 Name
            </div>
            Generate | Custom Question
          </RowSpacedOut>
          <RowSpacedOut>
            <FormGroup>
              <label>Category</label>
              <Input placeholder="Category" />
            </FormGroup>
            <FormGroup>
              <label>Number</label>
              <Input placeholder="Number" />
            </FormGroup>
          </RowSpacedOut>
          <RowSpacedOut>
            <FormGroup>
              <label>Difficulty</label>
              <Input placeholder="Difficulty" />
            </FormGroup>
            <FormGroup>
              <label>Type</label>
              <Input placeholder="type" />
            </FormGroup>
          </RowSpacedOut>
          <RowSide>
            <Button white>Generate</Button>
          </RowSide>
        </Card>
      </Section>
    </>
  );
};

export default make;
