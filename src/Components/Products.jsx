import React, { useContext, useEffect, useState } from "react";
import { array, showHearder } from "../App";
import Product from "./Product";
import styled from "styled-components";
import { getAuth } from "@firebase/auth";
import { db, firebaseApp } from "../Firebase/config";
import { collection, getDocs, query } from "@firebase/firestore";

function Products(props) {
  const [show, setShow] = useContext(showHearder);
  let { innerWidth: width } = window;
  const [column, setColumn] = useState(3);
  const [data, setData] = useContext(array);

  // const getData = async () => {
  //   const auth = getAuth(firebaseApp);
  //   const q = query(
  //     collection(db, "merchants", auth.currentUser.uid, "products")
  //   );

  //   let array = [];

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     array.push(doc.data());
  //   });
  //   return array;
  // };

  // useEffect(() => {
  //   getData().then((array) => setData(array));
  //   setShow(true);
  // }, []);
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
              description={c.details}
              id={c.id}
              images={[c.image]}
              title={c.productName}
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
