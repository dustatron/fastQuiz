import Head from "next/head";
import {
  RowCenter,
  TitleLarge,
  Section,
  SpacerBar,
} from "../components/Styled";

export default function Home() {
  return (
    <Section>
      <TitleLarge dark>
        Welcome to Fast<strong>Quiz</strong>
      </TitleLarge>
      <SpacerBar />
      <RowCenter>Make and share quiz games within minutes.</RowCenter>

      {/* <InitialMakeQuiz /> */}
    </Section>
  );
}
