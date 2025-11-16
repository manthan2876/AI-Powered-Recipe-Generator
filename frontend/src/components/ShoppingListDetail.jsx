import React, { useState } from "react";
import { addShoppingListItem, updateShoppingListItem, deleteShoppingListItem } from "../services/shoppingLists";

function ShoppingListDetail({ list, onClose, onUpdated }) {
  const [itemForm, setItemForm] = useState({ ingredient: "", quantity: "" });

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await addShoppingListItem(list._id || list.id, itemForm);
      setItemForm({ ingredient: "", quantity: "" });
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const handleUpdateItem = async (itemId, ingredient, quantity) => {
    try {
      await updateShoppingListItem(list._id || list.id, itemId, { ingredient, quantity });
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteShoppingListItem(list._id || list.id, itemId);
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#333',
          margin: 0
        }}>
          {list.name}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              padding: '6px 12px',
              backgroundColor: '#f0f0f0',
              color: '#666',
              border: 'none',
              borderRadius: '4px',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        )}
      </div>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: '0 0 20px 0'
      }}>
        {(list.items || []).map((item, idx) => (
          <li
            key={item._id || idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px',
              backgroundColor: '#f9f9f9',
              borderRadius: '4px',
              marginBottom: '8px'
            }}
          >
            <span style={{ fontSize: '14px', color: '#333' }}>
              {item.ingredient} - {item.quantity}
            </span>
            <button
              onClick={() => handleDeleteItem(item._id || item.id)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#ff4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#cc0000'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ff4444'}
            >
              Delete
            </button>
          </li>
        ))}
        {(!list.items || list.items.length === 0) && (
          <li style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
            No items in this list
          </li>
        )}
      </ul>
      <form onSubmit={handleAddItem} style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        <input
          value={itemForm.ingredient}
          onChange={(e) => setItemForm(f => ({ ...f, ingredient: e.target.value }))}
          placeholder="Ingredient"
          required
          style={{
            flex: 1,
            minWidth: '150px',
            padding: '10px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            fontSize: '14px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#4caf50'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />
        <input
          value={itemForm.quantity}
          onChange={(e) => setItemForm(f => ({ ...f, quantity: e.target.value }))}
          placeholder="Quantity"
          required
          style={{
            width: '100px',
            padding: '10px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            fontSize: '14px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#4caf50'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4caf50'}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default ShoppingListDetail;
