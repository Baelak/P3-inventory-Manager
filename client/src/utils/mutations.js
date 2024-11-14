import { gql } from '@apollo/client';

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
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

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