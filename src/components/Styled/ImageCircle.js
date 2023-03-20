import styled from "styled-components";

const ImageCircle = styled.div`
  border-radius: 6px 0 0 6px;
  height: 100%;
  width: 30%;
  /* margin: 5px; */
  overflow: hidden;

  img {
    display: block;
    margin: 0 auto;
    text-align: center;
    min-height: 100%;
    width: 100%;
  }
`;

export default ImageCircle;
