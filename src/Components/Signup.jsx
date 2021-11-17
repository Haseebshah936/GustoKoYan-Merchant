import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { color } from "../Style/color";

function Signup(props) {
  //   return <Container></Container>;
  return (
    <Container className="container">
      <h1 className="text-center mt-3">Register</h1>
      <form>
        <Wrapper>
          <TextInputContainer>
            <div className="mb-3">
              <label htmlFor="resturantname">Resturant Name</label>
              <input id="resturantname" type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="ownername">Owner Name</label>
              <input id="ownername" type="text" className="form-control" />
            </div>
          </TextInputContainer>
          <ImageInputContainer>
            <div className="mb-3">
              <label htmlFor="ownername">Owner Name</label>
              <input
                onClick={(e) => e.currentTarget.v}
                id="ownername"
                type="file"
              />
            </div>
          </ImageInputContainer>
        </Wrapper>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Container>
  );
}

export default Signup;

const Container = styled.div`
  input:focus {
    border-color: #ffce44;
    box-shadow: 0px 0px 0rem 0px #ffce44;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const TextInputContainer = styled.div`
  flex: 0.75;
`;
const ImageInputContainer = styled.div`
  flex: 0.2;
`;
