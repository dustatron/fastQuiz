import styled from "styled-components";
import { colors } from "../../helpers";

const ScoreBox = styled.div`
  height: 100%;
  width: 23%;
  text-align: center;
  align-items: center;
  font-size: 25px;
  padding: 10px;
  background: ${colors.darkGray};
  color: ${colors.white};
  display: flex;
  border-radius: 0 6px 6px 0;
`;

export default ScoreBox;
