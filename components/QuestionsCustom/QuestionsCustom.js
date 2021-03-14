import React from "react";
import { RowCenter, RowSide, Button, FormGroup, Input } from "../Styled";

const QuestionsCustom = () => {
  return (
    <>
      <RowCenter>
        <FormGroup width={"100%"}>
          <label>Question</label>
          <Input placeholder="Add the question" />
          <label>Correct Answer</label>
          <Input placeholder="Add the right answer" />
        </FormGroup>
      </RowCenter>

      <RowCenter>
        <FormGroup width={"100%"}>
          <label>Wrong Answers</label>
          <Input placeholder="Wrong Answer 1" />
          <Input placeholder="Wrong Answer 2" />
          <Input placeholder="Wrong Answer 3" />
        </FormGroup>
      </RowCenter>
      <RowSide end>
        <Button white>Add</Button>
      </RowSide>
    </>
  );
};

export default QuestionsCustom;
