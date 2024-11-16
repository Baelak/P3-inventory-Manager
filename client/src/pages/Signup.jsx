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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleFormSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Username"
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
        </div>
        <button
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;