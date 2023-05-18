import React, { useEffect } from 'react';

const Login = ({ onLoginSuccess, onLoginFailure }) => {
  const handleLoginSuccess = (response) => {
    // Handle successful login
    onLoginSuccess(response);
  };

  const handleLoginFailure = (error) => {
    // Handle failed login
    onLoginFailure(error);
  };

  useEffect(() => {
    // Initialize Google Sign-In client
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_TOKEN,
      callback: handleLoginSuccess,
      cancel_callback: handleLoginFailure,
    });
  }, []);

  return (
    <div id="google-signin-button">Sign in with Google</div>
  );
};

export default Login;
