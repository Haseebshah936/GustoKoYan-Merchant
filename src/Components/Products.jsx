import React, { useContext, useEffect, useState } from "react";
import { array, showHearder } from "../App";
import Product from "./Product";
import styled from "styled-components";

function Products(props) {
  const [show, setShow] = useContext(showHearder);
  let { innerWidth: width } = window;
  const [column, setColumn] = useState(3);
  const [data, setData] = useContext(array);
  useEffect(() => {
    setShow(true);
  }, []);
  useEffect(() => {
    if (width < 400) {
      setColumn(12);
    } else if (width > 400 && width < 768) {
      setColumn(6);
    } else if (width >= 768) {
      setColumn(4);
    }
  }, [width]);
  return (
    <Container>
      {data.map((c) => {
        return (
          <Wrapper key={c.id}>
            <Product
              description={c.description}
              id={c.id}
              images={c.images}
              title={c.title}
              price={c.price}
            />
          </Wrapper>
        );
      })}
    </Container>
  );
}

export default Products;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 15vh;
  padding-left: 15vw;
  padding-right: 5vw;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
    padding-top: 15vh;
  }
`;
const Wrapper = styled.div`
  margin: 1rem;
`;
