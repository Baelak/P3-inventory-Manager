import { gql } from '@apollo/client';

// User mutations
export const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Inventory mutations
export const ADD_INVENTORY_ITEM = gql`
  mutation addInventoryItem($name: String!, $quantity: Int!, $price: Float!) {
    addInventoryItem(name: $name, quantity: $quantity, price: $price) {
      _id
      name
      quantity
      price
      userId
    }
  }
`;

export const DELETE_INVENTORY_ITEM = gql`
  mutation deleteInventoryItem($id: ID!) {
    deleteInventoryItem(id: $id)
  }
`;

// Query for getting user's inventory items
export const GET_INVENTORY_ITEMS = gql`
  query GetInventoryItems {
    getInventoryItems {
      _id
      name
      quantity
      price
      userId
    }
  }
`;