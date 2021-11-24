import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import styled from "styled-components";
import { color } from "../Style/color";

import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

function Product({
  id = "",
  images = [],

  title = "",
  description = "",
  price = "",

  handleClick = () => {},
}) {
  const [current, setCurrent] = useState(0);
  const renderImages = (value) => {
    const newCurrent = current + value;
    if (newCurrent < 0) {
      setCurrent(images.length - 1);
    } else if (newCurrent > images.length - 1) {
      setCurrent(0);
    } else if (newCurrent < images.length && newCurrent >= 0) {
      setCurrent(newCurrent);
    }
  };
  return (
    <Container
      className="card"
      style={{
        width: "28rem",
        height: "43rem",
      }}
    >
      <ImageContainer style={{ display: "flex", boxSizing: "border-box" }}>
        <img
          src={images[current]}
          style={{ flex: 1, objectFit: "contain" }}
          className={`card-img-top S${id} active`}
          alt="product image"
        />
        {images.length > 1 && (
          <ButtonContainer>
            <span onClick={() => renderImages(-1)}>
              <ArrowBackIosOutlinedIcon id="movebtn" />
            </span>
            <span onClick={() => renderImages(1)}>
              <ArrowForwardIosOutlinedIcon id="movebtn" />
            </span>
          </ButtonContainer>
        )}
      </ImageContainer>
      <Wrap>
        <h3>{title}</h3>
        <h4>{price}&nbsp;$</h4>
      </Wrap>
      <p className="card-text ps-3 pe-3">{description}</p>
    </Container>
  );
}

export default Product;

const Container = styled.div`
  p {
    height: 10rem;
    overflow-x: hidden;
    font-size: 1.2rem;
    text-align: justify;
  }
  img {
    height: 27rem;
  }
  margin-bottom: 2rem;
`;

const Wrap = styled.div`
  width: 100%;
  h3 {
    font-size: 1.6rem;
    opacity: 0.9;
  }
  h4 {
    font-size: 1.4rem;
    opacity: 0.9;
  }
  h3,
  h4 {
    line-height: auto;
    font-weight: bold;
  }
  text-decoration: none;
  background: white;
  text-overflow: ellipsis;
  display: flex;
  justify-content: space-between;
  color: black;
  overflow: hidden;
  padding: 1rem;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem;
  #movebtn {
    height: 5rem;
    color: white;
    cursor: pointer;
  }
`;
