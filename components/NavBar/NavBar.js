import React, { useState } from "react";
import Link from "next/link";
import NavBody from "./NavBody";
// import ContainerFlex from "../Styled/ContainerFlex";
import Logo from "./Logo";
import Menu from "./Menu";
import Item from "./Item";
import { ButtonShy, ContainerFlex } from "../Styled";

const NavBar = ({ user, signOut, signIn }) => {
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
          {/* <Item>
            <Link href="/make">
              <ButtonShy
                white
                active={selected === 1}
                onClick={() => setSelected(1)}
              >
                Make
              </ButtonShy>
            </Link>
          </Item> */}
          <Item>
            <Link href="/games">
              <ButtonShy
                active={selected === 2}
                white
                onClick={() => setSelected(2)}
              >
                games
              </ButtonShy>
            </Link>
          </Item>
          <Item>
            {user ? (
              <ButtonShy active={selected === 3} white onClick={signOut}>
                Sign Out
              </ButtonShy>
            ) : (
              <ButtonShy white onClick={signIn}>
                Sign In
              </ButtonShy>
            )}
          </Item>
        </Menu>
      </ContainerFlex>
    </NavBody>
  );
};

export default NavBar;
