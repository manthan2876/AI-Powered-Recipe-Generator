import React, { useState } from "react";
import { addShoppingListItem, updateShoppingListItem, deleteShoppingListItem } from "../../services/shoppingLists";

function ShoppingListDetail({ list, onClose, onUpdated }) {
  const [itemForm, setItemForm] = useState({ ingredient: "", quantity: "" });

  const handleAddItem = async (e) => {
    e.preventDefault();
    await addShoppingListItem(list._id, itemForm);
    setItemForm({ ingredient: "", quantity: "" });
    onUpdated();
  };

  const handleUpdateItem = async (itemId, ingredient, quantity) => {
    await updateShoppingListItem(list._id, itemId, { ingredient, quantity });
    onUpdated();
  };

  const handleDeleteItem = async (itemId) => {
    await deleteShoppingListItem(list._id, itemId);
    onUpdated();
  };

  return (
    <div className="detail-modal">
      <button onClick={onClose}>Close</button>
      <h2>{list.name}</h2>
      <ul>
        {list.items.map(item => (
          <li key={item._id}>
            {item.ingredient} - {item.quantity}
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
            {/* Optionally add update/edit functionality here */}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddItem}>
        <input
          value={itemForm.ingredient}
          onChange={e => setItemForm(f => ({ ...f, ingredient: e.target.value }))}
          placeholder="Ingredient"
          required
        />
        <input
          value={itemForm.quantity}
          onChange={e => setItemForm(f => ({ ...f, quantity: e.target.value }))}
          placeholder="Quantity"
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default ShoppingListDetail;
