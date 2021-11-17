import React, { useContext, useEffect } from "react";
import { showHearder } from "../App";

function Products(props) {
  const [show, setShow] = useContext(showHearder);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div style={{ padding: "20vw" }}>
      <h1>Products Page</h1>
    </div>
  );
}

export default Products;
