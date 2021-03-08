import React from "react";
import Link from "next/link";
import NavBody from "./NavBody";
import ContainerFlex from "../Styled/ContainerFlex";
import Logo from "./Logo";
import Menu from "./Menu";
import Item from "./Item";

const NavBar = () => {
  return (
    <NavBody>
      <ContainerFlex>
        <Logo>
          <Link href="/">
            <a>
              <span>Fast</span>
              <span>Quiz</span>
            </a>
          </Link>
        </Logo>
        <Menu>
          <Item>
            <Link href="/make">
              <a>Make</a>
            </Link>
          </Item>
          <Item>
            <Link href="/games">
              <a>games</a>
            </Link>
          </Item>
          <Item>
            <Link href="/blocked">
              <a>Logout</a>
            </Link>
          </Item>
        </Menu>
      </ContainerFlex>
    </NavBody>
  );
};

export default NavBar;
