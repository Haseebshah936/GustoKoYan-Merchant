import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import styled from "styled-components";
import { color } from "../Style/color";

import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

function Product({
  id = "",
  images = [],

  title = "",
  description = "",
  price = "",
  avaliable,

  deleteProduct = () => {},
  avaliabilty = () => {},
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
        height: "44rem",
      }}
    >
      <ImageContainer style={{ display: "flex", boxSizing: "border-box" }}>
        <img
          src={images[current]}
          style={{ flex: 1, objectFit: "cover" }}
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
        <h4>₱&nbsp;{price}</h4>
      </Wrap>
      <p className="card-text  ps-4 pe-3">{description}</p>
      <BtnAvaliabliltyConatiner>
        <button onClick={() => avaliabilty(id, avaliable)}>
          {avaliable ? "Make Not Available" : "Make Available"}
        </button>
      </BtnAvaliabliltyConatiner>
      <DeleteIcon
        style={{
          color: "tomato",
          position: "absolute",
          right: 5,
          top: 5,
          cursor: "pointer",
          background: "white",
          padding: ".5rem",
          borderRadius: "2rem",
        }}
        data-bs-toggle="modal"
        data-bs-target={`#icon${id}`}
        id="DeleteIcon"
      />

      <div
        className="modal fade"
        id={`icon${id}`}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Confirmation
              </h5>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this Item?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => deleteProduct(id)}
                data-bs-dismiss="modal"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Product;

const Container = styled.div`
  position: realtive;
  p {
    height: 9rem;
    padding-top: 0.5rem;
    overflow-x: hidden;
    font-size: 1.2rem;
    text-align: justify;
    border-top: 0.5px solid rgba(0, 0, 0, 0.2);
  }
  img {
    height: 27rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }
  #DeleteIcon {
    font-size: 3rem;
  }
  #DeleteIcon:hover {
    font-size: 3.5rem;
  }
  margin-bottom: 2rem;
`;

const Wrap = styled.div`
  width: 100%;
  h3 {
    color: ${color.primary};
    font-size: 1.6rem;
  }
  h4 {
    font-size: 1.4rem;
    opacity: 0.9;
    color: black;
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
  padding-bottom: 0.5rem;
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

const BtnAvaliabliltyConatiner = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem 1rem;
  button {
    padding: 1rem 1.5rem;
    background: tomato;
    border-radius: 0.5rem;
    color: white;
    fontweight: bold;
  }
  button:hover {
    opacity: 0.9;
  }
`;
