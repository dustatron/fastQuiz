import styled from "styled-components";

const FormGroup = styled.div`
  text-align: left;
  padding: 10px;
  width: ${(props) => (props.width ? props.width : "50%")};
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 5px;
  }
`;

export default FormGroup;
