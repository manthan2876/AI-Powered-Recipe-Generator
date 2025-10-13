// src/services/shoppingLists.js

import { API_BASE } from './apiConfig';

export async function getShoppingLists() {
  const res = await fetch(`${API_BASE}/api/shoppinglists`, { credentials: "include" });
  return res.ok ? res.json() : [];
}

export async function createShoppingList(data) {
  const res = await fetch(`${API_BASE}/api/shoppinglists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create shopping list');
  return res.json();
}

export async function deleteShoppingList(id) {
  const res = await fetch(`${API_BASE}/api/shoppinglists/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error('Failed to delete shopping list');
}

export async function addShoppingListItem(listId, item) {
  const res = await fetch(`${API_BASE}/api/shoppinglists/${listId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to add item');
  return res.json();
}

export async function updateShoppingListItem(listId, itemId, item) {
  const res = await fetch(`${API_BASE}/api/shoppinglists/${listId}/items/${itemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
}

export async function deleteShoppingListItem(listId, itemId) {
  const res = await fetch(`${API_BASE}/api/shoppinglists/${listId}/items/${itemId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error('Failed to delete item');
}
  