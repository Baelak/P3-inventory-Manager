// File: client/src/App.jsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Header />
          <Outlet />
      <Footer />
    </ApolloProvider>
  );
};

export default App
