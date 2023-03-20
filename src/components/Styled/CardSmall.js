import styled from "styled-components";
import { colors } from "../../helpers";
const CardSmall = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5.5rem;
  width: 18rem;
  border: 1px solid ${colors.black};
  border-radius: 5px;
  overflow: none;
  padding: 5px;
  background: ${colors.white};
  margin: 1em;

  .card-center {
    width: 47%;
    height: 100%;
    padding: 5px;
    display: grid;
    place-items: center;
    text-align: center;
  }
`;

export default CardSmall;
