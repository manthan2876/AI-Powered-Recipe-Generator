import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ShoppingList from "../components/ShoppingList";
import ShoppingListDetail from "../components/ShoppingListDetail";
import PageContainer, { fadeIn, staggerContainer } from "../components/PageContainer";
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
    <PageContainer>
      <div className="min-h-screen w-full px-4 py-6 md:px-8 lg:px-12">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-6xl mx-auto"
        >
          <motion.h1 
            variants={fadeIn('down', 0.1)}
            className="text-gradient-1 font-commissioner text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-center mb-8 md:mb-12"
          >
            Shopping Lists
          </motion.h1>
          
          <motion.form 
            variants={fadeIn('up', 0.2)}
            onSubmit={handleAddList}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-10"
          >
            <input
              type="text"
              placeholder="New list name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="w-full sm:w-auto flex-grow px-4 py-3 bg-black/50 backdrop-blur-md border-2 border-white/40 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors font-imprima"
            />
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center font-kalnia text-lg text-white border-2 border-white px-6 py-3 hover:scale-105 transition-transform duration-200"
            >
              Add List
            </motion.button>
          </motion.form>
          
          <motion.div 
            variants={fadeIn('up', 0.3)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            <motion.div 
              variants={fadeIn('right', 0.4)}
              className="md:col-span-1 bg-black/40 backdrop-blur-md rounded-xl border border-white/20 p-4 md:p-6"
            >
              <h2 className="text-gradient-2 font-commissioner text-xl font-bold mb-4">Your Lists</h2>
              <ul className="space-y-3">
                {lists.map((list) => (
                  <motion.li 
                    key={list.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ShoppingList
                      list={list}
                      isActive={activeList && activeList.id === list.id}
                      onClick={() => setActiveList(list)}
                      onDelete={() => handleDelete(list.id)}
                    />
                  </motion.li>
                ))}
                {lists.length === 0 && (
                  <p className="text-white/70 font-imprima text-center py-4">No shopping lists yet</p>
                )}
              </ul>
            </motion.div>
            
            <motion.div 
              variants={fadeIn('left', 0.5)}
              className="md:col-span-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/20 p-4 md:p-6"
            >
              {activeList ? (
                <ShoppingListDetail list={activeList} />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-white/70 font-imprima text-center py-12">Select a shopping list to view details</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </PageContainer>
  );
}

export default ShoppingListsPage;
