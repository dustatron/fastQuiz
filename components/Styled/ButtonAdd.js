import styled from "styled-components";
import colors from "../../helpers/colors";

const ButtonAdd = styled.button`
  background: ${colors.black};
  color: ${colors.white};
  font-weight: 900;
  font-size: 1rem;
  padding: 10px 13px;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  margin: 10px auto;

  @media screen and (max-width: 768px) {
    padding: 0;
    padding: 10px 13px;
    margin: 5px;
    font-size: unset;
  }
`;

export default ButtonAdd;
