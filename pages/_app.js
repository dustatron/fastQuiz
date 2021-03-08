import NavBar from "../components/NavBar";
import GlobalStyle from "../helpers/globalStyles";
import Container from "../components/Styled/Container";

function FastQuiz({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default FastQuiz;
