import styled from "styled-components";

const Section = styled.div`
  position: relative;
  padding: ${(props) => (props.pad ? props.pad : "4rem")};
  width: 70%;
  min-height: ${(props) => (props.height ? props.height : "50vh")};
`;

export default Section;
