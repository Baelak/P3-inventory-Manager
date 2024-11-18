const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors');
const db = require('./config/connection');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Updated CORS configuration with correct deployment URLs
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://p3-inventory-manager-qkt8.onrender.com',
    'https://p3-inventory-manager.onrender.com',
    'https://studio.apollographql.com'
  ],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files BEFORE Apollo Server setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    formatError: (err) => {
      console.error('GraphQL Error:', err);
      return err;
    },
    introspection: true,
    playground: {
      endpoint: '/graphql',
      settings: {
        'editor.theme': 'dark',
        'editor.reuseHeaders': true,
        'request.credentials': 'include',
        'tracing.hideTracingResponse': false,
      }
    }
  });

  await server.start();
  
  server.applyMiddleware({ 
    app,
    path: '/graphql',
    cors: false
  });

  // Move the catch-all route AFTER Apollo middleware
  if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  return new Promise((resolve, reject) => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 GraphQL endpoint at http://localhost:${PORT}${server.graphqlPath}`);
      console.log(`🎮 GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`);
      resolve();
    }).on('error', (err) => {
      reject(err);
    });
  });
};

db.once('open', () => {
  console.log('📚 MongoDB connected successfully');
  startApolloServer().catch(err => {
    console.error('Failed to start Apollo Server:', err);
    process.exit(1); // Exit if server fails to start
  });
});