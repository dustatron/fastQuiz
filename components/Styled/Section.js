import styled from "styled-components";

const Section = styled.div`
  position: relative;
  padding: ${(props) => (props.pad ? props.pad : "4rem")};
  width: 70%;
  min-height: ${(props) => (props.height ? props.height : "50vh")};

  // Ipad
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 2rem 0;
  }
`;

export default Section;
