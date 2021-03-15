import React from "react";
import { Section, Detail, TitleLarge, RowCenter, Button } from "../Styled";

const Blocked = () => {
  return (
    <Section height={"80vh"}>
      <Detail lite padBottom={"1em"}>
        You must be logged in to view this content
      </Detail>
      <TitleLarge padBottom={"1rem"} dark>
        Please Login
      </TitleLarge>
      <RowCenter>
        <Button>Login</Button>
      </RowCenter>
    </Section>
  );
};

export default Blocked;
