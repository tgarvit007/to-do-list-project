import React, { useState } from 'react';

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (!username || !password) {
      setErrorMessage('Please enter username and password');
    } else if (username !== storedUsername || password !== storedPassword) {
      setErrorMessage('Invalid credentials');
    } else {
      setLoggedIn(true);
      onLogin(username); // Pass the username to the onLogin function
    }
  };

  const handleSignup = () => {
    const storedUsername = localStorage.getItem('username');

    if (!username || !password) {
      setErrorMessage('Please enter username and password');
    } else if (storedUsername && storedUsername === username) {
      setErrorMessage('Username already exists. Please login.');
    } else {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      setLoggedIn(true);
      onLogin(username); // Pass the username to the onLogin function
      setUsername(''); // Clear the input fields after successful signup
      setPassword(''); // Clear the input fields after successful signup
      setErrorMessage(''); // Clear any error message
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setErrorMessage('');
  };

  if (loggedIn) {
    return (
      <div>
        <h2>Welcome, {username}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Login/Signup</h2>
      {errorMessage && <h3 style={{ color: 'red' }}>{errorMessage}</h3>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Auth;
