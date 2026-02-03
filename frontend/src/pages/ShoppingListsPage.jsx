import React, { useEffect, useState } from "react";
import ShoppingList from "../components/ShoppingList";
import ShoppingListDetail from "../components/ShoppingListDetail";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlassCard from "../components/ui/GlassCard";
import AnimatedButton from "../components/ui/AnimatedButton";
import { getShoppingLists, createShoppingList, deleteShoppingList } from "../services/shoppingLists";
import { motion, AnimatePresence } from "framer-motion";

function ShoppingListsPage() {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [activeList, setActiveList] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshLists = async () => {
    try {
      const data = await getShoppingLists();
      setLists(data);
    } catch (err) {
      console.error('Error fetching shopping lists:', err);
    } finally {
      setLoading(false);
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
    if (window.confirm("Are you sure you want to delete this list?")) {
      try {
        await deleteShoppingList(id);
        if (activeList && (activeList.id === id || activeList._id === id)) {
          setActiveList(null);
        }
        refreshLists();
      } catch (err) {
        console.error('Error deleting shopping list:', err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 dark:text-white transition-colors duration-300">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 relative z-10">

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-800 dark:text-white mb-2">
              Shopping <span className="text-primary">Lists</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your grocery runs efficiently.</p>
          </motion.div>

          <GlassCard className="mb-10 p-2 md:p-6 max-w-xl mx-auto">
            <form
              onSubmit={handleAddList}
              className="flex gap-3"
            >
              <input
                type="text"
                placeholder="Name your new list..."
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-white/40 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/80 dark:focus:bg-white/10 transition-all shadow-inner"
              />
              <AnimatedButton
                type="submit"
                variant="primary"
                className="whitespace-nowrap"
                disabled={!newListName.trim()}
              >
                <span className="text-xl font-bold leading-none">+</span>
              </AnimatedButton>
            </form>
          </GlassCard>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* List Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <h2 className="font-bold text-gray-700 dark:text-gray-200 px-2 flex items-center justify-between">
                <span>Your Lists</span>
                <span className="text-xs bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">{lists.length}</span>
              </h2>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {loading ? (
                  // Skeleton Loader
                  [1, 2, 3].map(i => (
                    <GlassCard key={i} className="h-20 animate-pulse bg-white/20" />
                  ))
                ) : lists.length > 0 ? (
                  <AnimatePresence>
                    {lists.map((list) => (
                      <motion.div
                        key={list.id || list._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        layout
                      >
                        <div className={`transition-all duration-300 transform ${activeList && (activeList.id === list.id || activeList._id === list._id) ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}>
                          <ShoppingList
                            list={list}
                            isActive={activeList && (activeList.id === list.id || activeList._id === list._id)}
                            onClick={() => setActiveList(list)}
                            onDelete={() => handleDelete(list.id || list._id)}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                ) : (
                  <div className="text-center py-10 bg-white/30 dark:bg-white/5 rounded-2xl border border-dashed border-gray-300 dark:border-white/10 text-gray-500 dark:text-gray-400">
                    <p>No lists yet. Create one above!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Detail View */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {activeList ? (
                  <motion.div
                    key={activeList.id || activeList._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GlassCard className="min-h-[500px]">
                      <ShoppingListDetail
                        list={activeList}
                        onUpdated={refreshLists}
                      />
                    </GlassCard>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full min-h-[400px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl bg-white/20 dark:bg-white/5"
                  >
                    <span className="text-6xl mb-4 opacity-50">🛒</span>
                    <p>Select a list to view and manage items</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ShoppingListsPage;
