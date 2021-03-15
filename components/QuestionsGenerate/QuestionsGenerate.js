import React, { useReducer } from "react";
import {
  RowSpacedOut,
  FormGroup,
  Input,
  RowSide,
  Button,
  Select,
} from "../Styled";

const initialState = {
  category: "",
  amount: 3,
  difficulty: "",
  type: "",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "category":
      return { ...state, category: payload };
    case "amount":
      return { ...state, amount: payload };
    case "difficulty":
      return { ...state, difficulty: payload };
    case "type":
      return { ...state, type: payload };

    default:
      return state;
  }
};

const QuestionsGenerate = ({ handleGenerate }) => {
  const [formData, dispatch] = useReducer(reducer, initialState);
  const onSubmit = (e) => {
    e.preventDefault();
    handleGenerate(formData);
  };
  return (
    <form onSubmit={onSubmit}>
      <RowSpacedOut>
        <FormGroup>
          <label>Category</label>
          <Select
            placeholder="Category"
            value={formData.category}
            onChange={(e) => {
              dispatch({ type: "category", payload: e.target.value });
            }}
          >
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <label>Number</label>
          <Input
            placeholder="Number"
            type="number"
            value={formData.amount}
            onChange={(e) => {
              dispatch({ type: "amount", payload: e.target.value });
            }}
          />
        </FormGroup>
      </RowSpacedOut>

      <RowSpacedOut>
        <FormGroup>
          <label>Difficulty</label>
          <Select
            placeholder="Difficulty"
            value={formData.difficulty}
            onChange={(e) => {
              dispatch({ type: "difficulty", payload: e.target.value });
            }}
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <label>Type</label>
          <Select
            placeholder="type"
            value={formData.type}
            onChange={(e) => {
              dispatch({ type: "type", payload: e.target.value });
            }}
          >
            <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </Select>
        </FormGroup>
      </RowSpacedOut>
      <RowSide end>
        <Button white>Generate</Button>
      </RowSide>
    </form>
  );
};

export default QuestionsGenerate;
