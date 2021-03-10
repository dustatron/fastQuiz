import styled from "styled-components";

const RowCenter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
  padding-top: ${(props) => (props.padTop ? props.padTop : "unset")};
  padding-bottom: ${(props) => (props.padBottom ? props.padBottom : "unset")};
`;

function getSpacing(props) {
  switch (props) {
    case props.spacedOut:
      return "space-between";

    default:
      return "center";
  }
}

export default RowCenter;
