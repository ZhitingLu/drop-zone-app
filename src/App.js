import React from 'react';
import Login from './Login';
import DropZone from './DropZone';

const App = () => {
  const handleLoginSuccess = (response) => {
    // Handle successful login
    console.log('Login success:', response);
  };

  const handleLoginFailure = (error) => {
    // Handle failed login
    console.log('Login failure:', error);
  };

  return (
    <div>
      <h1>Drop Zone App</h1>
      <Login onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />
      <DropZone />
    </div>
  );
};

export default App;
