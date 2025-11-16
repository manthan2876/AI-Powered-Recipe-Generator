import React, { useEffect, useState } from "react";
import ShoppingList from "../components/ShoppingList";
import ShoppingListDetail from "../components/ShoppingListDetail";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getShoppingLists, createShoppingList, deleteShoppingList } from "../services/shoppingLists";

function ShoppingListsPage() {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [activeList, setActiveList] = useState(null);

  const refreshLists = async () => {
    try {
      const data = await getShoppingLists();
      setLists(data);
    } catch (err) {
      console.error('Error fetching shopping lists:', err);
    }
  };
  
  useEffect(() => {
    refreshLists();
  }, []);

  const handleAddList = async (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      try {
        await createShoppingList({ name: newListName });
        setNewListName("");
        refreshLists();
      } catch (err) {
        console.error('Error creating shopping list:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteShoppingList(id);
      if (activeList && activeList.id === id) {
        setActiveList(null);
      }
      refreshLists();
    } catch (err) {
      console.error('Error deleting shopping list:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{
        flex: 1,
        padding: '40px 20px',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '40px',
            color: '#333'
          }}>
            Shopping Lists
          </h1>
          
          <form
            onSubmit={handleAddList}
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              marginBottom: '40px',
              flexWrap: 'wrap'
            }}
          >
            <input
              type="text"
              placeholder="New list name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              style={{
                flex: 1,
                minWidth: '200px',
                maxWidth: '400px',
                padding: '12px',
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
                padding: '12px 24px',
                backgroundColor: '#4caf50',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4caf50'}
            >
              Add List
            </button>
          </form>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              padding: '24px'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#333'
              }}>
                Your Lists
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {lists.map((list) => (
                  <li key={list.id || list._id} style={{ marginBottom: '12px' }}>
                    <ShoppingList
                      list={list}
                      isActive={activeList && (activeList.id === list.id || activeList._id === list._id)}
                      onClick={() => setActiveList(list)}
                      onDelete={() => handleDelete(list.id || list._id)}
                    />
                  </li>
                ))}
                {lists.length === 0 && (
                  <li>
                    <p style={{
                      textAlign: 'center',
                      color: '#666',
                      padding: '20px',
                      fontSize: '14px'
                    }}>
                      No shopping lists yet
                    </p>
                  </li>
                )}
              </ul>
            </div>
            
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              padding: '24px',
              minHeight: '300px'
            }}>
              {activeList ? (
                <ShoppingListDetail
                  list={activeList}
                  onUpdated={refreshLists}
                />
              ) : (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <p style={{
                    textAlign: 'center',
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    Select a shopping list to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ShoppingListsPage;
