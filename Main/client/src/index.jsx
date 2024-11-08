// File: client/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated to use `react-dom/client` for React 18+
import App from './App';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './utils/apolloClient';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
