import React, { useRef, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { color } from "../Style/color";

function Signup(props) {
  //   return <Container></Container>;
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
  const [image, setImage] = useState("");
  const hiddenFileInput = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      // alert(JSON.stringify(account));
      // alert(URL.createObjectURL(image));
      props.history.replace("/");
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
          </TextInputContainer>
          <ImageInputContainer>
            <div>
              <h3>Resturant Banner</h3>
              <div className="Image">
                {image && <img src={URL.createObjectURL(image)} alt="" />}
              </div>
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
                Upload a file
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
