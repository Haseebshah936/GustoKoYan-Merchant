import React, { useContext, useEffect, useState } from "react";
import { array } from "../App";
import Product from "./Product";
import styled from "styled-components";
import _, { set } from "lodash";
import Pagination, { paginate } from "./Pagination";
import { db, firebaseApp, storage } from "../Firebase/config";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";

function Products(props) {
  const [data] = useContext(array);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const pageSize = 4;
  const [pagesCount, setPagesCount] = useState(0);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    setProducts(paginate(data, currentPage, pageSize));
    let pageCount = Math.ceil(data.length / pageSize);
    setPagesCount(pageCount);
  }, [data, currentPage]);

  const getData = async (pid) => {
    const q = query(
      collection(db, "merchants", auth.currentUser.uid, "products"),
      where("id", "==", pid)
    );

    const querySnapshot = await getDocs(q);
    let id;
    querySnapshot.forEach((doc) => {
      id = doc.id;
    });
    return id;
  };

  const handleDeleteProduct = (pid) => {
    try {
      getData(pid).then(async (id) => {
        await deleteDoc(
          doc(db, "merchants", auth.currentUser.uid, "products", id)
        );
        const storageRef = ref(
          storage,
          `merchantsImages/${auth.currentUser.uid}/${auth.currentUser.uid}/${pid}`
        );
        deleteObject(storageRef).catch((error) => {
          alert(error);
        });
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Wrap>
      <Container>
        {products.map((c) => {
          return (
            <Wrapper key={c.id}>
              <Product
                description={c.details}
                id={c.id}
                images={[c.image]}
                title={c.productName}
                price={c.price}
                deleteProduct={handleDeleteProduct}
              />
            </Wrapper>
          );
        })}
      </Container>
      <Pagination
        currentPage={currentPage}
        pagesCount={pagesCount}
        onPageChange={setCurrentPage}
      />
    </Wrap>
  );
}

export default Products;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15vh;
  padding-left: 15vw;
  padding-right: 5vw;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
    padding-top: 15vh;
  }
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5rem;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  margin: 1rem;
`;
