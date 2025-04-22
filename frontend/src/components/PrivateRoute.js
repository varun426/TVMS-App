import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  // Check if the user is authenticated (token exists in localStorage)
  const isAuthenticated = localStorage.getItem("token") !== null;

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the passed element (protected component)
  return <Element />;
};

export default PrivateRoute;
