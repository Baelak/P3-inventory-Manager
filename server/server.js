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

// Updated CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://p3-inventory-manager.onrender.com',
    'https://studio.apollographql.com'  // Allow Apollo Studio
  ],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    formatError: (err) => {
      console.error('GraphQL Error:', err);
      return err;
    },
    // Add these settings for better playground support
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
    cors: false,
  });


  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 GraphQL endpoint at http://localhost:${PORT}/graphql`);
    console.log(`🎮 GraphQL Playground available at http://localhost:${PORT}/graphql`);
  });
};

db.once('open', () => {
  console.log('📚 MongoDB connected successfully');
  startApolloServer().catch(err => {
    console.error('Failed to start Apollo Server:', err);
  });
});