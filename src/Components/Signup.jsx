import React, { useRef, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { color } from "../Style/color";
import Joi from "joi";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, addDoc, collection, Timestamp } from "firebase/firestore";

import { db, firebaseApp, storage } from "../Firebase/config";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

function Signup(props) {
  const [account, setAccount] = useState({
    resturantName: "",
    ownerName: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
    details: "",
    websiteLink: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    resturantName: "",
    ownerName: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
    details: "",
    websiteLink: "",
    phoneNumber: "",
    image: "",
  });
  const [image, setImage] = useState("");
  const schema = Joi.object({
    ownerName: Joi.string().required().alphanum(),
    resturantName: Joi.string().required(),
    location: Joi.string().required().label("Location"),
    email: Joi.string().email({ tlds: [] }).required(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    confirmPassword: Joi.ref("password"),
    details: Joi.string().required(),
    websiteLink: Joi.string().required(),
    phoneNumber: Joi.string().required(),
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
      resturantName: "",
      ownerName: "",
      location: "",
      email: "",
      password: "",
      confirmPassword: "",
      details: "",
      websiteLink: "",
      phoneNumber: "",
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
      createUserWithEmailAndPassword(auth, account.email, account.password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          const storageRef = ref(
            storage,
            `merchantsImages/${user.uid}/${user.uid}`
          );
          UploadImage(storageRef).then(async (url) => {
            await setDoc(doc(db, "merchants", user.uid), {
              resturantName: account.resturantName,
              ownerName: account.ownerName,
              location: account.location,
              email: account.email,
              details: account.details,
              websiteLink: account.websiteLink,
              phoneNumber: account.phoneNumber,
              activated: false,
              creationDate: Timestamp.fromDate(new Date()),
              image: url,
              rating: [5],
            });
            await addDoc(collection(db, "merchants", user.uid, "reviews"), {
              userId: "",
              rating: 5,
              message: "",
            });
          });
        })
        .then(() => {
          props.history.replace("/");
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
      <h1 className="text-center mt-3">Register</h1>
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <TextInputContainer>
            <div className="mb-3">
              <label htmlFor="resturantname">Resturant Name</label>
              <input
                value={account.resturantName}
                onChange={handleChange}
                name="resturantName"
                id="resturantName"
                type="text"
                className="form-control"
              />
            </div>

            <p style={{ color: "tomato" }}>{errors.resturantName}</p>
            <div className="mb-3">
              <label htmlFor="ownername">Owner Name</label>
              <input
                value={account.ownerName}
                id="ownerName"
                onChange={handleChange}
                name="ownerName"
                type="text"
                className="form-control"
              />
            </div>
            <p style={{ color: "tomato" }}>{errors.ownerName}</p>
            <div className="mb-3">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                value={account.phoneNumber}
                id="phoneNumber"
                onChange={handleChange}
                name="phoneNumber"
                type="text"
                className="form-control"
              />
            </div>
            <p style={{ color: "tomato" }}>{errors.phoneNumber}</p>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                value={account.email}
                id="email"
                onChange={handleChange}
                name="email"
                type="email"
                className="form-control"
              />
            </div>
            <p style={{ color: "tomato" }}>{errors.email}</p>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                value={account.password}
                id="password"
                onChange={handleChange}
                name="password"
                type="password"
                className="form-control"
              />
            </div>
            <p style={{ color: "tomato" }}>{errors.password}</p>
            <div className="mb-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                value={account.confirmPassword}
                id="confirmPassword"
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                className="form-control"
              />
            </div>
            <p style={{ color: "tomato" }}>{errors.confirmPassword}</p>
            <div className="mb-3">
              <label htmlFor="location">Resturant Location</label>
              <input
                value={account.location}
                id="location"
                onChange={handleChange}
                name="location"
                type="url"
                className="form-control"
              />
            </div>
            <p style={{ color: "tomato" }}>{errors.location}</p>
            <div className="mb-3">
              <label htmlFor="websiteLink">Facebook Page/ Website Link</label>
              <input
                value={account.websiteLink}
                id="websiteLink"
                onChange={handleChange}
                name="websiteLink"
                type="url"
                className="form-control"
              />
            </div>
            <p style={{ color: "tomato" }}>{errors.websiteLink}</p>
            <div className="mb-3">
              <label htmlFor="details">Resturant Details</label>
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
              <h3>Resturant Banner</h3>
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
                  setImage(e.target.files[0]);
                }}
                style={{ display: "none" }}
                accept={".jpg, .png"}
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

export default Signup;

const Container = styled.div`
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
