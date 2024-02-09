import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import isAuthenticated from './isAuthenticated';

function PublicRoute() {
  return isAuthenticated() ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoute;
