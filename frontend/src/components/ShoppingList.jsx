import React from "react";

function ShoppingList({ list, onView, onDelete }) {
  return (
    <div className="p-4 rounded-md" style={{ background: 'var(--card)', color: 'var(--text)' }}>
      <div className="flex items-center justify-between">
        <h3 onClick={onView} style={{ cursor: "pointer" }} className="font-semibold">{list.name}</h3>
        <button onClick={onDelete} className="text-sm px-2 py-1 rounded" style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid rgba(255,255,255,0.04)' }}>Delete</button>
      </div>
      <ul className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
        {list.items.slice(0, 3).map(item => (
          <li key={item._id}>{item.ingredient} - {item.quantity}</li>
        ))}
        {list.items.length > 3 && <li>...and {list.items.length - 3} more</li>}
      </ul>
    </div>
  );
}

export default ShoppingList;
