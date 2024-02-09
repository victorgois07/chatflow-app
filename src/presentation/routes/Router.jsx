import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../main/auth/ProtectedRoute';
import PublicRoute from '../../main/auth/PublicRoute';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

function Router() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default Router;
