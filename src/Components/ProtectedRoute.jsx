import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router";
import { loginState } from "../App";

function ProtectedRoute({ component: Component, ...rest }) {
  const [login] = useContext(loginState);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (login) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
