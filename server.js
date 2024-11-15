const express = require("express");
const { ApolloServer } = require('@apollo/server');
const path = require("path");
const cors = require("cors");
const db = require("./config/connection");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const { authMiddleware } = require("./utils/auth");
const { expressMiddleware } = require("@apollo/server/express4");
const routes = require("./routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  formatError: (err) => {
    console.error("GraphQL Error:", err);
    return err;
  },
  // Add these settings for better playground support
  introspection: true,
  playground: {
    endpoint: "/graphql",
    settings: {
      "editor.theme": "dark",
      "editor.reuseHeaders": true,
      "request.credentials": "include",
      "tracing.hideTracingResponse": false,
    },
  },
});

const GOOGLE_API_KEY = process.env.VITE_GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.VITE_SEARCH_ENGINE_ID;

const startApolloServer = async () => {
  await server.start();

  // Updated CORS configuration
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://studio.apollographql.com", // Allow Apollo Studio
      ],
      credentials: true,
    })
  );

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/graphql", expressMiddleware(server));
  app.use(routes);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client/dist/index.html"));
    });
  }
  db.once("open", () => {
    console.log("📚 MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 GraphQL endpoint at http://localhost:${PORT}/graphql`);
      console.log(
        `🎮 GraphQL Playground available at http://localhost:${PORT}/graphql`
      );
    });
  });
};

startApolloServer().catch((err) => {
  console.error("Failed to start Apollo Server:", err);
});
