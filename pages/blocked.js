import React from "react";
import { Card, TitleLarge, Section, Detail } from "../components/Styled";

export default function Blocked() {
  return (
    <Section>
      <Card>
        <Detail lite>You must be logged in to view this content</Detail>
        <TitleLarge padTop={"2rem"}>Blocked</TitleLarge>
      </Card>
    </Section>
  );
}
