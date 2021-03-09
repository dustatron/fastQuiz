import styled from "styled-components";

const RowCenter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
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
