import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { showHearder } from "../App";

function NotFound(props) {
  const [show, setShow] = useContext(showHearder);
  useEffect(() => {
    if (show) {
      setShow(false);
    }
  });
  return (
    <Container>
      <h1>404</h1>
      <p>Page Not Found</p>
    </Container>
  );
}

export default NotFound;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 4rem;
  }
  p {
    font-size: 3rem;
    font-weight: bold;
  }
`;
