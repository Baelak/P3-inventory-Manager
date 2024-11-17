import React from 'react';
import ReactDOM from 'react-dom/client'; // Using `react-dom/client` for React 18+
import App from './App.jsx';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './utils/apolloClient';
import '@/styles/app.css'; // Using alias for robust path resolution

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
