import { useState } from "react";
import styled from "styled-components";

import { Link, NavLink } from "react-router-dom";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import LocalMallTwoToneIcon from "@mui/icons-material/LocalMallTwoTone";
import { color } from "../Style/color";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth } from "@firebase/auth";
import { firebaseApp } from "../Firebase/config";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { AddCircleOutline } from "@mui/icons-material";
function MenuBar(props) {
  const [first, setFirst] = useState("active");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const makeActive = (id) => {
    if (id === 1) {
      setFirst("active");
      setSecond("");
      setThird("");
    } else if (id === 2) {
      setFirst("");
      setSecond("active");
    } else {
    }
  };
  const signOut = () => {
    const auth = getAuth(firebaseApp);
    auth.signOut();
  };

  return (
    <BurgerNav>
      <Space />
      <NavLink to="/Products">
        <li>
          <LocalMallTwoToneIcon className="product" />
          Products
        </li>
      </NavLink>
      <NavLink to="/addProducts">
        <li>
          <AddCircleOutline className="store" />
          Add&nbsp;Item
        </li>
      </NavLink>
      <NavLink to="/store">
        <li>
          <StoreOutlinedIcon className="store" />
          Orders
        </li>
      </NavLink>
      <NavLink to="/Profile">
        <li>
          <PersonOutlineIcon className="store" />
          Profile
        </li>
      </NavLink>
      <NavLink to="/login" onClick={signOut}>
        <li>
          <LogoutIcon className="store" />
          LogOut
        </li>
      </NavLink>
    </BurgerNav>
  );
}

export default MenuBar;
const BurgerNav = styled.div`
  position: fixed;
  height: 100vh;
  top: 0px;
  left: 0px;
  list-style: none;
  text-transform: capitalize;
  background: ${color.menuBackground};
  padding: 0 1rem 0 0.5rem;
  transition: 0.2s all linear;
  .product,
  .store {
    font-size: 3rem;
    margin-right: 0.5rem;
  }
  a {
    text-decoration: none;
  }
  li {
    text-transform: capitalize;
    line-height: 3.5rem;
    color: ${color.textColor};
    font-size: 2rem;
    font-weight: bold;
  }
  a.active li {
    color: ${color.primary};
    .product,
    .store {
      padding: 0.5rem;
      background: ${color.primary};
      color: white;
      border-radius: 2.5rem;
    }
  }
  li {
    width: 12vw;
    display: flex;
    align-items: center;
  }
  @media (min-width: 769px) {
    margin-top: 5vh;
    li {
      padding: 1rem 0.5rem;
    }
  }
  @media (max-width: 768px) {
    clip-path: polygon(0 0, 32% 0, 32% 100%, 0 100%);
    margin: 0rem;

    li.active {
      .product,
      .store {
        border-radius: 0;
      }
    }
    width: 12.5rem;
  }
`;
const Space = styled.div`
  margin: 3rem;
  @media (max-width: 768px) {
    margin: 7rem;
  }
`;
