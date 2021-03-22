import Head from "next/head";
import InitialMakeQuiz from "../components/InitialMakeQuiz";

export default function Home() {
  return (
    <>
      <Head>
        <title>FastQuiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <InitialMakeQuiz />
    </>
  );
}
