import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = ({ onLoginSuccess, onLoginFailure }) => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_TOKEN; 

  const handleLoginSuccess = (response) => {
    // Handle successful login
    onLoginSuccess(response);
  };

  const handleLoginFailure = (error) => {
    // Handle failed login
    onLoginFailure(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={handleLoginSuccess}
      onFailure={handleLoginFailure}
      cookiePolicy="single_host_origin"
    />
  );
};

export default Login;
