import React from 'react'

import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ component: Comp, loggedIn, path, baseUrl,accessToken,history,...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={props => {
          return loggedIn ? (
            <Comp {...props} baseUrl={baseUrl} accessToken={accessToken}  />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  prevLocation: path,
                  error: "You need to login first!",
                },
              }}
            />
          );
        }}
      />
    );
  };

  export default ProtectedRoute;