import React, { useState } from "react";
import { addShoppingListItem, updateShoppingListItem, deleteShoppingListItem } from "../services/shoppingLists";

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
    <div className="detail-modal p-6 rounded" style={{ background: 'var(--card)', color: 'var(--text)' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{list.name}</h2>
        <button onClick={onClose} className="text-sm" style={{ color: 'var(--muted)', background: 'transparent', border: 'none' }}>Close</button>
      </div>
      <ul className="mb-4" style={{ color: 'var(--muted)' }}>
        {list.items.map(item => (
          <li key={item._id} className="flex items-center justify-between py-1">
            <span>{item.ingredient} - {item.quantity}</span>
            <button onClick={() => handleDeleteItem(item._id)} className="text-sm" style={{ color: 'var(--accent)', background: 'transparent', border: 'none' }}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddItem} className="flex gap-2">
        <input
          value={itemForm.ingredient}
          onChange={e => setItemForm(f => ({ ...f, ingredient: e.target.value }))}
          placeholder="Ingredient"
          required
          className="flex-1 p-2 rounded"
          style={{ background: 'var(--bg)', border: '1px solid rgba(255,255,255,0.04)', color: 'var(--text)' }}
        />
        <input
          value={itemForm.quantity}
          onChange={e => setItemForm(f => ({ ...f, quantity: e.target.value }))}
          placeholder="Quantity"
          required
          className="w-32 p-2 rounded"
          style={{ background: 'var(--bg)', border: '1px solid rgba(255,255,255,0.04)', color: 'var(--text)' }}
        />
        <button type="submit" className="px-3 py-2 rounded" style={{ background: 'var(--accent)', color: '#fff' }}>Add</button>
      </form>
    </div>
  );
}

export default ShoppingListDetail;
