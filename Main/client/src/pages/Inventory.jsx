// File: client/src/pages/Inventory.js
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_INVENTORY_ITEMS } from '../utils/queries';
import { ADD_INVENTORY_ITEM } from '../utils/mutations';
import InventoryItemCard from '../components/InventoryItemCard';

const Inventory = () => {
  const { loading, data } = useQuery(GET_INVENTORY_ITEMS);
  const [addInventoryItem] = useMutation(ADD_INVENTORY_ITEM);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0.0);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await addInventoryItem({ variables: { name, quantity, price } });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <h2>Inventory</h2>
      <form onSubmit={handleAddItem}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item Name" />
        <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} placeholder="Quantity" />
        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} placeholder="Price" />
        <button type="submit">Add Item</button>
      </form>
      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        data?.getInventoryItems.map(item => <InventoryItemCard key={item._id} item={item} />)
      )}
    </main>
  );
};

export default Inventory;
