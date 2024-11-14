// File: client/src/components/InventoryItemCard.js
import React from 'react';

const InventoryItemCard = ({ item }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{item.name}</h3>
      <p>Quantity: {item.quantity}</p>
      <p>Price: ${item.price.toFixed(2)}</p>
    </div>
  );
};

export default InventoryItemCard;
