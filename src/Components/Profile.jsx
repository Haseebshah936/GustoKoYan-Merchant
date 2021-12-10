import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { color } from "../Style/color";
import Joi from "joi";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db, firebaseApp, storage } from "../Firebase/config";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { profileContext } from "../App";

function Profile(props) {
  const [account, setAccount] = useState({
    resturantName: "",
    ownerName: "",
    location: "",
    details: "",
    websiteLink: "",
    phoneNumber: "",
    country: "",
    city: "",
  });
  const [errors, setErrors] = useState({
    resturantName: "",
    ownerName: "",
    location: "",
    details: "",
    websiteLink: "",
    phoneNumber: "",
    image: "",
    country: "",
    city: "",
  });
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const hiddenFileInput = useRef("");
  const [profile, setProfile] = useContext(profileContext);
  const schema = Joi.object({
    ownerName: Joi.string().required().alphanum(),
    resturantName: Joi.string().required(),
    location: Joi.string().required().label("Location"),
    details: Joi.string().required(),
    websiteLink: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    country: Joi.string().required().label("Country Name"),
    city: Joi.string().required().label("City Name"),
    image: Joi.object().required().label("Image"),
  });

  useEffect(() => {
    setAccount({
      resturantName: profile?.resturantName,
      ownerName: profile?.ownerName,
      location: profile?.location,
      details: profile?.details,
      websiteLink: profile?.websiteLink,
      phoneNumber: profile?.phoneNumber,
      country: profile?.country,
      city: profile?.city,
    });
    setUrl(profile?.image);
  }, [profile]);

  const UploadImage = async (ref) => {
    if (image) {
      return await uploadBytes(ref, image).then(() => {
        return getDownloadURL(ref);
      });
    } else {
      return url;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      resturantName: "",
      ownerName: "",
      location: "",
      email: "",
      details: "",
      websiteLink: "",
      phoneNumber: "",
      image: "",
      country: "",
      city: "",
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
      const storageRef = ref(
        storage,
        `merchantsImages/${user.uid}/${user.uid}`
      );
      UploadImage(storageRef)
        .then(async (url) => {
          console.log(account);
          await updateDoc(doc(db, "merchants", user.uid), {
            resturantName: account.resturantName,
            ownerName: account.ownerName,
            location: account.location,
            details: account.details,
            websiteLink: account.websiteLink,
            phoneNumber: account.phoneNumber,
            city: account.city,
            country: account.country,
            image: url,
          }).catch((error) => {
            alert(error.code);
          });
          addDoc(collection(db, "merchants", user.uid, "reviews"), {
            userId: "",
            rating: 5,
            message: "",
          }).catch((error) => {
            alert(error.code);
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
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <TextInputContainer>
            <div className="mb-3">
              <label htmlFor="resturantname">Resturant Name - Branch</label>
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
              <label htmlFor="ownername">Owner's Complete Name</label>
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
              <label htmlFor="country">Town</label>
              <input
                value={account.country}
                id="country"
                onChange={handleChange}
                name="country"
                type="text"
                className="form-control"
              />
            </div>
            <p style={{ color: "tomato" }}>{errors.country}</p>
            <div className="mb-3">
              <label htmlFor="city">City</label>
              <input
                value={account.city}
                id="city"
                onChange={handleChange}
                name="city"
                type="text"
                className="form-control"
              />
            </div>
            <p style={{ color: "tomato" }}>{errors.city}</p>
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
              <h3>Company/Resturant's Logo</h3>
              <div className="Image">{url && <img src={url} alt="" />}</div>
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
                  if (e.target.files[0]?.size > 300000) {
                    setErrors({
                      ...errors,
                      image: "Image size can not be more then 300KB",
                    });
                  } else {
                    setErrors({
                      ...errors,
                      image: "",
                    });
                    setImage(e.target.files[0]);
                    setUrl(URL.createObjectURL(e.target.files[0]));
                  }
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

export default Profile;

const Container = styled.div`
  height: 200vh;
  padding-top: 10vh;
  padding-left: 15vw;
  padding-right: 5vw;
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
