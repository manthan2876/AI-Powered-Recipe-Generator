import React from "react";

function ShoppingList({ list, onView, onDelete }) {
  return (
    <div className="shopping-list">
      <h3 onClick={onView} style={{ cursor: "pointer" }}>{list.name}</h3>
      <button onClick={onDelete}>Delete</button>
      <ul>
        {list.items.slice(0, 3).map(item => (
          <li key={item._id}>{item.ingredient} - {item.quantity}</li>
        ))}
        {list.items.length > 3 && <li>...and {list.items.length - 3} more</li>}
      </ul>
    </div>
  );
}

export default ShoppingList;
