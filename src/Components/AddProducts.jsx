import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap";
import { color } from "../Style/color";
import Joi from "joi";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db, firebaseApp, storage } from "../Firebase/config";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { array } from "../App";

function AddProducts(props) {
  const [account, setAccount] = useState({
    productName: "",
    price: "",
    details: "",
  });
  const [errors, setErrors] = useState({
    productName: "",
    price: "",
    details: "",
    image: "",
  });
  const [image, setImage] = useState("");
  const [data, setData] = useContext(array);

  const schema = Joi.object({
    productName: Joi.string().required(),
    price: Joi.string().required().min(1),
    details: Joi.string().required(),
    image: Joi.object().required().label("Image"),
  });
  const hiddenFileInput = useRef("");

  const UploadImage = async (ref) => {
    return await uploadBytes(ref, image).then(() => {
      return getDownloadURL(ref);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      productName: "",
      price: "",
      details: "",
      image: "",
    });
    const error = schema.validate({ ...account, image }, { abortEarly: false });
    const erros = { ...errors };
    if (error.error) {
      for (let item of error.error.details) {
        erros[item.path[0]] = item.message;
      }
      setErrors(erros);
      console.log(error);
    } else {
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
      let id;
      if (data.length) {
        id = data[data.length - 1].id + 1;
      } else {
        id = 0;
      }
      const storageRef = ref(
        storage,
        `merchantsImages/${user.uid}/${user.uid}/${id}`
      );

      UploadImage(storageRef)
        .then(async (url) => {
          console.log(url);
          await addDoc(collection(db, "merchants", user.uid, "products"), {
            id,
            productName: account.productName,
            price: account.price,
            details: account.details,
            creationDate: serverTimestamp(),
            image: url,
          });
        })
        .then(() => {
          props.history.replace("/Products");
        })
        .catch((error) => {
          alert(error.code);
        });
    }
  };
  const handleChange = ({ currentTarget: input }) => {
    const accoun = { ...account };
    accoun[input.name] = input.value;
    setAccount(accoun);
  };
  const handleClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };
  return (
    <Container className="container">
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <TextInputContainer>
            <div className="mb-3">
              <label htmlFor="productName">Product Name</label>
              <input
                value={account.productName}
                onChange={handleChange}
                name="productName"
                id="productName"
                type="text"
                className="form-control"
              />
            </div>

            <p style={{ color: "tomato" }}>{errors.productName}</p>
            <div className="mb-3">
              <label htmlFor="price">Price</label>
              <input
                value={account.price}
                id="price"
                onChange={handleChange}
                name="price"
                type="number"
                className="form-control"
              />
            </div>
            <p style={{ color: "tomato" }}>{errors.price}</p>
            <div className="mb-3">
              <label htmlFor="details">Product Details</label>
              <textarea
                rows="8"
                cols="50"
                value={account.details}
                id="details"
                onChange={handleChange}
                name="details"
                type=""
                className="form-control"
              />
            </div>
            <p style={{ color: "tomato" }}>{errors.details}</p>
          </TextInputContainer>
          <ImageInputContainer>
            <div>
              <h3>Product Image</h3>
              <div className="Image">
                {image && <img src={URL.createObjectURL(image)} alt="" />}
              </div>
              <p style={{ color: "tomato" }}>{errors.image}</p>
              <button
                style={{
                  display: "block",
                  fontSize: "1.5rem",
                  padding: "1rem",
                  marginTop: "1.2rem",
                  background: color.primary,
                  fontWeight: "bold",
                }}
                onClick={handleClick}
              >
                Upload Image
              </button>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={(e) => {
                  if (e.target.files[0]?.size > 100000) {
                    setErrors({
                      ...errors,
                      image: "Image size can not be more then 100KB",
                    });
                  } else {
                    setErrors({
                      ...errors,
                      image: "",
                    });
                    setImage(e.target.files[0]);
                  }
                }}
                style={{ display: "none" }}
                accept={".jpg, .png, .jpeg"}
              />
            </div>
          </ImageInputContainer>
        </Wrapper>
        <SubmitContainer>
          <button type="submit" className="btn btn-warning" style={{}}>
            Submit
          </button>
        </SubmitContainer>
      </form>
    </Container>
  );
}

export default AddProducts;

const Container = styled.div`
  padding-top: 10vh;
  padding-left: 15vw;
  padding-right: 5vw;
  height: 200vh;
  h1 {
    margin: 2rem;
    font-size: 4rem;
    font-weight: bold;
  }
  label {
    font-size: 1.5rem;
  }
  input,
  textarea {
    font-size: 1.5rem;
    padding: 1rem;
    text-transform: none;
  }
  input:focus,
  textarea:focus {
    border-color: #ffce44;
    box-shadow: 0px 0px 0rem 0px #ffce44;
  }
`;
const Wrapper = styled.div``;
const TextInputContainer = styled.div``;
const ImageInputContainer = styled.div`
  .Image {
    height: 40rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
const SubmitContainer = styled.div`
  width: 100%;
  margin: 2rem 0rem;
  display: flex;
  justify-content: center;
  button {
    font-weight: bold;
    width: 35%;
    padding: 1rem;
    font-size: 1.5rem;
  }
`;
