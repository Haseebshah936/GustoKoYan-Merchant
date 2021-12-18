import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap";
import { color } from "../Style/color";
import Joi from "joi";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db, firebaseApp, storage } from "../Firebase/config";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { array, profileContext } from "../App";

function AddProducts(props) {
  const [account, setAccount] = useState({
    productName: "",
    price: "",
    details: "",
    extras: [],
    category: "",
  });
  const [errors, setErrors] = useState({
    productName: "",
    price: "",
    details: "",
    image: "",
    extras: [],
    category: "",
  });
  const [image, setImage] = useState("");
  const [data, setData] = useContext(array);
  const [extraName, setExtraName] = useState("");
  const [price, setPrice] = useState(0);
  const [profile, setProfile] = useContext(profileContext);
  const [extraNameError, setExtraNameError] = useState("");
  const dissMiss = useRef("");

  const schema = Joi.object({
    productName: Joi.string().required(),
    price: Joi.string().required().min(1),
    details: Joi.string().required(),
    image: Joi.object().required().label("Image"),
    category: Joi.string().required(),
    extras: Joi.array(),
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
      category: "",
      extras: [],
    });
    const error = schema.validate({ ...account, image }, { abortEarly: false });
    const erros = { ...errors };
    if (error.error) {
      for (let item of error.error.details) {
        erros[item.path[0]] = item.message;
      }
      setErrors(erros);
    } else {
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
      let id;
      if (data.length) {
        id = data[data.length - 1].id + 1;
      } else {
        id = 1;
      }
      const storageRef = ref(
        storage,
        `merchantsImages/${user.uid}/${user.uid}/${id}`
      );

      UploadImage(storageRef)
        .then(async (url) => {
          await addDoc(collection(db, "merchants", user.uid, "products"), {
            id,
            productName: account.productName,
            price: account.price,
            details: account.details,
            creationDate: serverTimestamp(),
            extras: account.extras,
            image: url,
            available: true,
            category: account.category,
          });
        })
        .then(() => {
          props.history.replace("/Products");
        })
        .catch((error) => {
          console.warn(error.code);
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
  const handleAdd = () => {
    if (extraName === "") {
      setExtraNameError("Extra Item Name is required");
    } else {
      setExtraNameError("");
      const accoun = { ...account };
      accoun["extras"] = [...account.extras, { name: extraName, price: price }];
      setAccount(accoun);
      setExtraName("");
      setPrice(0);
      dissMiss.current.click();
    }
  };
  const removeCategory = (index) => {
    const accoun = { ...account };
    accoun["extras"] = account.extras.filter((c, i) => i != index);
    setAccount(accoun);
  };
  const handleCategory = (category) => {
    const accoun = { ...account };
    accoun["category"] = category;
    setAccount(accoun);
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
          <div className="dropdown">
            <button
              className="btn btn-warning w-100 dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                textTransform: "capitalize",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {account.category ? account.category : "Select Category"}
            </button>
            <ul
              className="dropdown-menu"
              style={{ width: "100%" }}
              aria-labelledby="dropdownMenuButton1"
            >
              {profile?.categories.map((c, i) => (
                <li style={{ width: "100%" }} key={i}>
                  <p
                    className="dropdown-item"
                    style={{ width: "100%", fontSize: "1.2rem" }}
                    onClick={() => handleCategory(c)}
                  >
                    {c}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <p style={{ color: "tomato" }}>{errors.category}</p>
          <Extras>
            <h3>Extras</h3>
            <ExtrasList>
              {account.extras.map((e, i) => (
                <Extra key={i}>
                  <p>{e.name}</p>
                  <p style={{ marginLeft: "1rem" }}>₱&nbsp;{e.price}</p>
                  <p
                    style={{
                      cursor: "pointer",
                      color: "black",
                      marginLeft: "1rem",
                      fontSize: "1rem",
                    }}
                    onClick={() => removeCategory(i)}
                  >
                    x
                  </p>
                </Extra>
              ))}
            </ExtrasList>
            <p style={{ color: "tomato" }}>{errors.extras}</p>
            <button
              type="button"
              className="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add Exteras
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Add Extra Serving Item
                    </h5>
                  </div>
                  <div className="modal-body">
                    <label htmlFor="details">Item Name</label>
                    <input
                      type="text"
                      onChange={(t) => setExtraName(t.currentTarget.value)}
                      value={extraName}
                    />
                    <p style={{ color: "tomato" }}>{extraNameError}</p>
                    <label htmlFor="details">Item Price</label>
                    <input
                      type="number"
                      onChange={(t) => setPrice(t.currentTarget.value)}
                      value={price}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setExtraName("");
                        setPrice(0);
                      }}
                      ref={dissMiss}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => handleAdd()}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Extras>
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
const Extras = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  input {
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    width: 100%;
  }
  input:focus {
    border-color: #ffce44;
  }
`;
const ExtrasList = styled.div`
  width: 100%;
  height: 20rem;
  border: 0.1rem solid rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
`;
const Extra = styled.div`
  margin: 1rem;
  padding: 0.5rem 1rem;
  display: flex;
  background: ${color.menuBackground};
  border: 0.1rem solid rgba(0, 0, 0, 0.2);
  height: 2.5rem;
  border-radius: 5%;
  min-width: 5rem;
  color: black;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  p {
    margin: 0rem;
  }
  font-weight: bold;
`;
