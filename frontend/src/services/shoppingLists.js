// src/services/shoppingLists.js

export async function getShoppingLists() {
    const res = await fetch("/api/shoppinglist", { credentials: "include" });
    return res.ok ? res.json() : [];
  }
  
  export async function createShoppingList(data) {
    await fetch("/api/shoppinglist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
  }
  
  export async function deleteShoppingList(id) {
    await fetch(`/api/shoppinglist/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  }
  
  export async function addShoppingListItem(listId, item) {
    await fetch(`/api/shoppinglist/${listId}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(item),
    });
  }
  
  export async function updateShoppingListItem(listId, itemId, item) {
    await fetch(`/api/shoppinglist/${listId}/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(item),
    });
  }
  
  export async function deleteShoppingListItem(listId, itemId) {
    await fetch(`/api/shoppinglist/${listId}/items/${itemId}`, {
      method: "DELETE",
      credentials: "include",
    });
  }
  