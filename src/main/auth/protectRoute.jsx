import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem('token'); // Check if token exists in localStorage

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={props => {
        if (token) {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <Component {...props} />;
        }
        return <Redirect to="/error" />;
      }}
    />
  );
}

export default PrivateRoute;
