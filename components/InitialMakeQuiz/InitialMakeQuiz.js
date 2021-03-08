import React from "react";
import Section from "../Styled/Section";
import Link from "next/link";
import Card from "../Styled/Card";
import Title from "../Styled/Title";
import Input from "../Styled/Input";
import Button from "../Styled/Button";
import CenterItem from "../Styled/CenterItem";

const InitialMakeQuiz = () => {
  return (
    <Section>
      <Card>
        <Title>Make Quiz</Title>
        <Input placeholder="Name your quiz" />
        <Link href="/make">
          <a>
            <Button white>Make</Button>
          </a>
        </Link>
      </Card>
      <CenterItem>
        <Button>Join Game</Button>
      </CenterItem>
    </Section>
  );
};

export default InitialMakeQuiz;
