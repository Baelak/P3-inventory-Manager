import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const [register, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      console.log('Registration completed with data:', data);
      if (data?.register?.token) {
        console.log('Token received, saving to localStorage');
        localStorage.setItem('id_token', data.register.token);
        console.log('Redirecting to dashboard...');
        window.location.assign('/dashboard');
      }
    },
    onError: (error) => {
      console.log('Registration error occurred:', {
        message: error.message,
        graphQLErrors: error.graphQLErrors,
        networkError: error.networkError
      });

      const message = error.graphQLErrors?.[0]?.message ||
        error.networkError?.result?.errors?.[0]?.message ||
        error.message ||
        'Registration failed';
      setErrorMessage(message);
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`Field ${name} changed to:`, value);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted with values:', formState);
    setErrorMessage('');

    try {
      if (!formState.username || !formState.email || !formState.password) {
        const message = 'All fields are required';
        console.log('Validation error:', message);
        setErrorMessage(message);
        return;
      }

      console.log('Attempting registration with:', formState);
      const { data } = await register({
        variables: { ...formState }
      });
      console.log('Registration response:', data);

      if (!data?.register?.token) {
        throw new Error('No token received');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      // Error will be handled by onError callback
    }
  };

  return (
    <main>
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleFormSubmit}>
            <input
              placeholder="Username 😊"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
            />
            <input
              placeholder="Email 📧"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              placeholder="Password 🤫"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
          {errorMessage && (
            <div>
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default Signup;