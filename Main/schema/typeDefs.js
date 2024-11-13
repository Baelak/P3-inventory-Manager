const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  type InventoryItem {
    _id: ID!
    name: String!
    quantity: Int!
    price: Float!
  }

  type Query {
    getInventoryItems: [InventoryItem]
    me: User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Auth!
    login(email: String!, password: String!): Auth!
    addInventoryItem(name: String!, quantity: Int!, price: Float!): InventoryItem
  }
`;

// Add immediate debugging
console.log('TypeDefs loaded:', !!typeDefs);

module.exports = typeDefs;  // Export directly without curly braces