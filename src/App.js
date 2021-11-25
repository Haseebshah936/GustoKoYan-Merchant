import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import Login from "./Components/Login";
import { firebaseApp } from "./Firebase/config";
import Header from "./Components/Header";
import Signup from "./Components/Signup";
import ForgotPassword from "./Components/ForgotPassword";
import NotFound from "./Components/NotFound";
import Products from "./Components/Products";
import ProtectedRoute from "./Components/ProtectedRoute";
import Profile from "./Components/Profile";
import Order from "./Components/Order";
import { dataMenu } from "./Components/dataMenu";
import AddProducts from "./Components/AddProducts";
export const loginState = createContext(false);
export const showHearder = createContext(false);
export const array = createContext([]);

function App(props) {
  const [login, setLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(dataMenu);
  useEffect(() => {
    const auth = getAuth(firebaseApp);
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if (user.emailVerified) {
            setLogin(user);
          } else if (!user.emailVerified) {
            sendEmailVerification(auth.currentUser).then(() => {
              alert(
                "A verification link was sent to you Please verify your Email"
              );
              auth.signOut();
            });
            setLogin(false);
          }
        } else {
          setLogin(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <loginState.Provider value={[login, setLogin]}>
      <showHearder.Provider value={[show, setShow]}>
        <array.Provider value={[data, setData]}>
          <Router>
            <Header />
            <Switch>
              <ProtectedRoute path="/addProducts" component={AddProducts} />
              <ProtectedRoute path="/Profile" component={Profile} />
              <ProtectedRoute path="/store" component={Order} />
              <ProtectedRoute path="/Products" component={Products} />
              <Route path="/forgotPassword" component={ForgotPassword} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Redirect exact from="/" to="/Products" />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </array.Provider>
      </showHearder.Provider>
    </loginState.Provider>
  );
}

export default App;
