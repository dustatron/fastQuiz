import styled from "styled-components";

const RowCenter = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  padding-top: ${(props) => (props.padTop ? props.padTop : "unset")};
  padding-bottom: ${(props) => (props.padBottom ? props.padBottom : "unset")};
`;

export default RowCenter;
