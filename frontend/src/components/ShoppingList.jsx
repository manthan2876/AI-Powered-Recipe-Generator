import React from "react";

function ShoppingList({ list, isActive, onClick, onDelete }) {
  return (
    <div style={{
      padding: '16px',
      backgroundColor: isActive ? '#e8f5e9' : '#f5f5f5',
      borderRadius: '8px',
      border: isActive ? '2px solid #4caf50' : '1px solid #e0e0e0',
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginBottom: '12px'
    }}
    onClick={onClick}
    onMouseEnter={(e) => {
      if (!isActive) {
        e.currentTarget.style.backgroundColor = '#f0f0f0';
      }
    }}
    onMouseLeave={(e) => {
      if (!isActive) {
        e.currentTarget.style.backgroundColor = '#f5f5f5';
      }
    }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '8px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#333',
          margin: 0
        }}>
          {list.name}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
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
      </div>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        fontSize: '13px',
        color: '#666'
      }}>
        {(list.items || []).slice(0, 3).map((item, idx) => (
          <li key={item._id || idx} style={{ marginBottom: '4px' }}>
            {item.ingredient} - {item.quantity}
          </li>
        ))}
        {list.items && list.items.length > 3 && (
          <li style={{ color: '#999', fontStyle: 'italic' }}>
            ...and {list.items.length - 3} more
          </li>
        )}
      </ul>
    </div>
  );
}

export default ShoppingList;
