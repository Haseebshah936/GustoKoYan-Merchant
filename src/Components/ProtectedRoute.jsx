import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router";
import { loginState, profileContext } from "../App";

function ProtectedRoute({ component: Component, ...rest }) {
  const [login] = useContext(loginState);
  const [profile] = useContext(profileContext);
  console.log(profile);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (login) {
          if (profile.activated) {
            return <Component {...props} />;
          } else {
            return <Redirect to="/approval" />;
          }
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
