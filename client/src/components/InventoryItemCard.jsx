import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_INVENTORY_ITEM } from '../utils/mutations';
import { GET_INVENTORY_ITEMS } from '../utils/queries';

const InventoryItemCard = ({ item }) => {
  const [deleteItem] = useMutation(DELETE_INVENTORY_ITEM, {
    variables: { id: item._id },
    refetchQueries: [{ query: GET_INVENTORY_ITEMS }],
    onError: (error) => {
      console.error('Delete error:', error);
    }
  });

  const handleDelete = async () => {
    try {
      const { data } = await deleteItem();
      if (data.deleteInventoryItem) {
        console.log('Item deleted successfully');
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };
  return (
    <tr key={item._id}>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>{item.price}</td>
      <td>
        <button
          onClick={handleDelete}
          className="delete-button"
          aria-label={`Delete ${item.name}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </td>
    </tr>

  );
};

export default InventoryItemCard;