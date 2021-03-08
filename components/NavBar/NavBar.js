import React, { useState } from "react";
import Link from "next/link";
import NavBody from "./NavBody";
import ContainerFlex from "../Styled/ContainerFlex";
import Logo from "./Logo";
import Menu from "./Menu";
import Item from "./Item";

const NavBar = () => {
  const [selected, setSelected] = useState(0);

  return (
    <NavBody>
      <ContainerFlex>
        <Logo>
          <Link href="/">
            <a onClick={() => setSelected(0)}>
              <span>Fast</span>
              <span>Quiz</span>
            </a>
          </Link>
        </Logo>
        <Menu>
          <Item active={selected === 1}>
            <Link href="/make">
              <a onClick={() => setSelected(1)}>Make</a>
            </Link>
          </Item>
          <Item active={selected === 2}>
            <Link href="/games">
              <a onClick={() => setSelected(2)}>games</a>
            </Link>
          </Item>
          <Item active={selected === 3}>
            <Link href="/blocked">
              <a onClick={() => setSelected(3)}>Logout</a>
            </Link>
          </Item>
        </Menu>
      </ContainerFlex>
    </NavBody>
  );
};

export default NavBar;
