import React, { useContext } from "react";
import styled from "styled-components";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../Firebase/config";
import { profileContext, showHearder } from "../App";
import MenuBar from "./MenuBar";
import { color } from "../Style/color";

function Header(props) {
  const [show] = useContext(showHearder);
  const [profile] = useContext(profileContext);

  if (show) {
    return (
      <div>
        <Container>
          <Link to="/Products">
            <Logo src={"/GustoKoYan_Logo.png"} />
            {profile.resturantName}
          </Link>
        </Container>
        <MenuBar />
      </div>
    );
  }
  return <div></div>;
}

export default withRouter(Header);
const Container = styled.div`
  width: 100vw;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1.2rem;
  z-index: 1;
  padding: 1rem;
  background: ${color.menuBackground};
  a {
    text-decoration: none;
    color: black;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
`;
const Logo = styled.img`
  height: 5rem;
  cursor: pointer;
`;
