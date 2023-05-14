import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = ({ onLoginSuccess, onLoginFailure }) => {
  const clientId = '337769292879-1ua7s8e127f2lhsoj5b76t3ubd0a6cts.apps.googleusercontent.com'; // Replace with your Google client ID

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
