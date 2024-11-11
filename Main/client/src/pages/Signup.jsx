// File: client/src/pages/Signup.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [register] = useMutation(REGISTER_USER);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: { username, email, password } });
      console.log(data); // Log the response to see if it has the expected structure
      if (data && data.register && data.register.token) {
        localStorage.setItem('id_token', data.register.token);
        window.location.assign('/dashboard');
      } else {
        console.error("No token returned in response");
        setErrorMessage("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setErrorMessage("Error during signup. Please try again."); // Set error message
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Signup</button>

      {/* Display error message if there's an error */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default Signup;
