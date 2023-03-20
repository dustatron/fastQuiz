import React, { useReducer } from "react";

import { RowCenter, RowSide, Button, FormGroup, Input } from "../Styled";

function reducer(state, action) {
  const { type, payload } = action;
  switch (action.type) {
    case "update_question":
      return { ...state, question: payload };
    case "update_answer":
      return { ...state, answer: payload };
    case "update_w1":
      return { ...state, w1: payload };
    case "update_w2":
      return { ...state, w2: payload };
    case "update_w3":
      return { ...state, w3: payload };
    case "reset":
      return { ...payload };
    default:
      return state;
  }
}

const initialState = {
  question: "",
  answer: "",
  w1: "",
  w2: "",
  w3: "",
};

const QuestionsCustom = ({ handleAddQuestion }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { question, answer, w1, w2, w3 } = state;

  const handleSubmit = (e, state) => {
    e.preventDefault();
    const wrapper = {
      question: state.question,
      correct_answer: state.answer,
      incorrect_answers: [state.w1, state.w2, state.w3],
    };
    handleAddQuestion(wrapper);
    dispatch({ type: "reset", payload: initialState });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, state)}>
        <RowCenter>
          <FormGroup width={"100%"}>
            <label>Question</label>
            <Input
              placeholder="Add the question"
              value={question}
              onChange={(e) => {
                dispatch({ type: "update_question", payload: e.target.value });
              }}
            />
            <label>Correct Answer</label>
            <Input
              placeholder="Add the right answer"
              value={answer}
              onChange={(e) => {
                dispatch({ type: "update_answer", payload: e.target.value });
              }}
            />
          </FormGroup>
        </RowCenter>

        <RowCenter>
          <FormGroup width={"100%"}>
            <label>Wrong Answers</label>
            <Input
              placeholder="Wrong Answer 1"
              value={w1}
              onChange={(e) => {
                dispatch({ type: "update_w1", payload: e.target.value });
              }}
            />
            <Input
              placeholder="Wrong Answer 2"
              value={w2}
              onChange={(e) => {
                dispatch({ type: "update_w2", payload: e.target.value });
              }}
            />
            <Input
              placeholder="Wrong Answer 3"
              value={w3}
              onChange={(e) => {
                dispatch({ type: "update_w3", payload: e.target.value });
              }}
            />
          </FormGroup>
        </RowCenter>
        <RowSide end>
          <Button type="submit" white>
            Add
          </Button>
        </RowSide>
      </form>
    </>
  );
};

export default QuestionsCustom;
