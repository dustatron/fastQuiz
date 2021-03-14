import styled from "styled-components";

const FormGroup = styled.div`
  text-align: left;
  padding: 10px;
  width: ${(props) => (props.width ? props.width : "50%")};
`;

export default FormGroup;
