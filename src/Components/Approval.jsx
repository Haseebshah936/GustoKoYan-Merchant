import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import { loginState, profileContext, showHearder } from "../App";

function Approval(props) {
  const [login, setLogin] = useContext(loginState);
  const [profile] = useContext(profileContext);

  useEffect(() => {
    if (profile.activated) {
      props.history.replace("/products");
    }
    if (!login) {
      props.history.replace("/login");
    }
  }, [login, profile]);
  return (
    <Wrap>
      <h1>Waiting For Approval</h1>
      <p>Make sure to pay the approval fee. </p>Account No
      <p style={{ color: "tomato" }}> 5555-5555-5555-5555</p>
      Contact us at <a href={"mailTo:example@abc.com"}>example@abc.com</a>
    </Wrap>
  );
}

export default Approval;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15vh;
  padding-left: 15vw;
  padding-right: 5vw;
  justify-content: center;
  align-items: center;
  h1 {
    margin-bottom: 2rem;
  }
  a {
    color: tomato;
  }
  @media (max-width: 1200px) {
    padding-top: 15vh;
  }
`;
