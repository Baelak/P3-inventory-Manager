const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type InventoryItem {
    _id: ID
    name: String
    quantity: Int
    price: Float
  }

  type User {
    _id: ID
    username: String
    email: String
    token: String
  }

  type Query {
    getInventoryItems: [InventoryItem]
  }

  type Mutation {
    addInventoryItem(name: String!, quantity: Int!, price: Float!): InventoryItem
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
`;

module.exports = { typeDefs };