// File: client/src/pages/Inventory.js
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_INVENTORY_ITEMS } from '../utils/queries';
import { ADD_INVENTORY_ITEM } from '../utils/mutations';
import InventoryItemCard from '../components/InventoryItemCard';

const Inventory = ({ user }) => {
  const { loading, data, error } = useQuery(GET_INVENTORY_ITEMS);
  const [addInventoryItem] = useMutation(ADD_INVENTORY_ITEM);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!user) {
      setErrorMessage("You must be logged in to add inventory.");
      return;
    }
    try {
      await addInventoryItem({ variables: { name, quantity: parseInt(quantity, 10), price: parseFloat(price) } });
      window.location.reload();
    } catch (err) {
      console.error("Error adding inventory item:", err);
    }
  };

  const renderInventoryItems = () => {
    if (!user) {
      return <p>Please log in to add inventory items.</p>;
    }
    if (!data || !data.getInventoryItems || data.getInventoryItems.length === 0) {
      return <p>No inventory available.</p>;
    }
    return data.getInventoryItems.map((item) => (
      <InventoryItemCard key={item._id} item={item} />
    ));
  };

  return (
    <main>
      <h2>Inventory</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {user && (
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item Name"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
          />
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
          <button type="submit">Add Item</button>
        </form>
      )}
      {loading ? <p>Loading inventory...</p> : renderInventoryItems()}
    </main>
  );
};

export default Inventory;
