// File: client/src/utils/mutations.js
import { gql } from '@apollo/client';

// LOGIN_USER Mutation: Handles logging in users by email and password
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      _id
      username
    }
  }
`;

// REGISTER_USER Mutation: Handles user registration with username, email, and password
export const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      _id
      username
    }
  }
`;

// ADD_INVENTORY_ITEM Mutation: Handles adding a new inventory item with name, quantity, and price
export const ADD_INVENTORY_ITEM = gql`
  mutation addInventoryItem($name: String!, $quantity: Int!, $price: Float!) {
    addInventoryItem(name: $name, quantity: $quantity, price: $price) {
      _id
      name
      quantity
      price
    }
  }
`;
