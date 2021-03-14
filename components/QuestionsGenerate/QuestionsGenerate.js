import React from "react";
import { RowSpacedOut, FormGroup, Input, RowSide, Button } from "../Styled";

const QuestionsGenerate = () => {
  return (
    <>
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
      <RowSide end>
        <Button white>Generate</Button>
      </RowSide>
    </>
  );
};

export default QuestionsGenerate;
