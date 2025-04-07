import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoutelogin = ({ element }) => {
  const userId = localStorage.getItem('userid'); // Get userId from localStorage

  if (!userId) {
    // If userId exists, redirect to Dashboard or Home page
    return <Navigate to="/Signin" replace />;
  }

  return element; // Allow access to /Signin, /SignUp, or /OtpCheck if userId is absent
};

export default PrivateRoutelogin;
