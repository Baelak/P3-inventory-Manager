// File: client/src/pages/Login.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN_USER);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      localStorage.setItem('id_token', data.login.token);
      window.location.assign('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username 😊" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password 👀" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
