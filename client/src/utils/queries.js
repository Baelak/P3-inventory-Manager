// File: client/src/utils/queries.js
import { gql } from '@apollo/client';

export const GET_INVENTORY_ITEMS = gql`
  query getInventoryItems {
    getInventoryItems {
      _id
      name
      quantity
      price
    }
  }
`;
