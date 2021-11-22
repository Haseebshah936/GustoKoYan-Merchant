import styled from "styled-components";
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { firebaseApp } from "../Firebase/config";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const auth = getAuth(firebaseApp);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Password reset email sent");
          props.history.replace("/");
        })
        .catch((error) => {
          alert(error.code);
        });
    }
  };
  return (
    <Container className="container">
      <form>
        <div class="mt-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(text) => setEmail(text.target.value)}
          />
        </div>
        <SubmitContainer>
          <button type="submit" class="btn btn-warning" onClick={handleSubmit}>
            Submit
          </button>
        </SubmitContainer>
      </form>
    </Container>
  );
}

export default ForgotPassword;
const Container = styled.div`
  margin-top: 5rem;
  label {
    font-size: 1.5rem;
  }
  input {
    font-size: 1.5rem;
    padding: 1rem;
  }
  input:focus {
    border-color: #ffce44;
    box-shadow: 0px 0px 0rem 0px #ffce44;
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
