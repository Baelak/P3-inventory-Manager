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
    userId: ID!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getInventoryItems: [InventoryItem]
    me: User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Auth!
    login(username: String!, password: String!): Auth!
    addInventoryItem(name: String!, quantity: Int!, price: Float!): InventoryItem!
    deleteInventoryItem(id: ID!): Boolean!
  }
`;

console.log('TypeDefs loaded:', !!typeDefs);
module.exports = typeDefs;