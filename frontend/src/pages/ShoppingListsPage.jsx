import React, { useEffect, useState } from "react";
import ShoppingList from "../components/ShoppingList";
import ShoppingListDetail from "../components/ShoppingListDetail";
import { getShoppingLists, createShoppingList, deleteShoppingList } from "../services/shoppingLists";

function ShoppingListsPage() {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [activeList, setActiveList] = useState(null);

  useEffect(() => {
    refreshLists();
  }, []);

  const refreshLists = async () => {
    const data = await getShoppingLists();
    setLists(data);
  };

  const handleAddList = async (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      await createShoppingList({ name: newListName });
      setNewListName("");
      refreshLists();
    }
  };

  const handleDelete = async (id) => {
    await deleteShoppingList(id);
    if (activeList && activeList.id === id) {
      setActiveList(null);
    }
    refreshLists();
  };

  return (
    <div className="shopping-lists-container">
      <h1>Shopping Lists</h1>
      <form onSubmit={handleAddList}>
        <input
          type="text"
          placeholder="New list name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button type="submit">Add List</button>
      </form>
      <div className="lists-and-detail">
        <ul className="list-names">
          {lists.map((list) => (
            <ShoppingList
              key={list.id}
              list={list}
              isActive={activeList && activeList.id === list.id}
              onClick={() => setActiveList(list)}
              onDelete={() => handleDelete(list.id)}
            />
          ))}
        </ul>
        {activeList && <ShoppingListDetail list={activeList} />}
      </div>
    </div>
  );
}

export default ShoppingListsPage;
