import React, { useState, useRef, useEffect } from 'react';

const RecipeSearch = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState([]);
  const [dietaryPreferences, setDietaryPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false
  });
  const [showIngredientDropdown, setShowIngredientDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Predefined ingredient categories based on the images
  const ingredientCategories = [
    {
      name: 'Pantry Essentials',
      items: ['butter', 'egg', 'garlic', 'milk', 'onion', 'sugar', 'flour', 'olive oil', 'garlic powder', 'white rice', 'cinnamon', 'ketchup', 'soy sauce', 'mayonnaise', 'vegetable oil'],
      nonVegetarian: ['butter', 'egg', 'milk']
    },
    {
      name: 'Vegetables & Greens',
      items: ['garlic', 'onion', 'bell pepper', 'scallion', 'carrot', 'tomato', 'potato', 'red onion', 'celery', 'avocado', 'zucchini', 'shallot', 'cherry tomato', 'cucumber', 'spinach'],
      nonVegetarian: []
    },
    {
      name: 'Mushrooms',
      items: ['button mushroom', 'shiitake mushroom', 'portobello mushroom', 'wild mushroom', 'porcini', 'oyster mushroom', 'mixed mushrooms', 'chestnut mushroom', 'enoki mushroom', 'black fungus', 'morel mushrooms', 'black truffle', 'field mushroom', 'king oyster mushroom', 'straw mushroom'],
      nonVegetarian: []
    },
    {
      name: 'Fruits',
      items: ['lemon', 'lime', 'apple', 'banana', 'orange', 'raisins', 'mango', 'pineapple', 'peach', 'date', 'coconut', 'raisins', 'pear', 'pomegranate', 'grape'],
      nonVegetarian: []
    },
    {
      name: 'Berries',
      items: ['strawberry', 'blueberry', 'raspberry', 'cranberry', 'cherry', 'blackberry', 'berry mix', 'dried cherry', 'sour cherry', 'dried blueberries', 'goji berry', 'freeze-dried strawberry'],
      nonVegetarian: []
    },
    {
      name: 'Meat & Protein',
      items: ['chicken', 'beef', 'pork', 'bacon', 'ham', 'sausage', 'ground beef', 'steak', 'turkey', 'lamb', 'shrimp', 'salmon', 'tuna', 'crab', 'lobster'],
      nonVegetarian: ['chicken', 'beef', 'pork', 'bacon', 'ham', 'sausage', 'ground beef', 'steak', 'turkey', 'lamb', 'shrimp', 'salmon', 'tuna', 'crab', 'lobster']
    },
    {
      name: 'Dairy & Alternatives',
      items: ['cheese', 'cream', 'yogurt', 'butter', 'milk', 'almond milk', 'soy milk', 'coconut milk', 'oat milk', 'cream cheese', 'sour cream', 'parmesan', 'cheddar', 'mozzarella', 'feta'],
      nonVegetarian: ['cheese', 'cream', 'yogurt', 'butter', 'milk', 'cream cheese', 'sour cream', 'parmesan', 'cheddar', 'mozzarella', 'feta']
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowIngredientDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleIngredientToggle = (ingredient) => {
    if (ingredients.includes(ingredient)) {
      setIngredients(ingredients.filter(item => item !== ingredient));
    } else {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const handleDietaryChange = (preference) => {
    setDietaryPreferences({
      ...dietaryPreferences,
      [preference]: !dietaryPreferences[preference]
    });
    
    // Clear selected ingredients that don't match the new dietary preference
    if (preference === 'vegetarian' && !dietaryPreferences.vegetarian) {
      const nonVegItems = ingredientCategories.flatMap(category => 
        category.nonVegetarian
      );
      setIngredients(ingredients.filter(item => !nonVegItems.includes(item)));
    }
  };

  const handleSearch = () => {
    // Ensure ingredients are properly passed to the search function
    console.log("Searching with ingredients:", ingredients);
    onSearch({
      ingredients,
      dietaryPreferences
    });
  };

  // Filter categories based on dietary preferences
  const filterCategoriesByDiet = () => {
    if (dietaryPreferences.vegetarian) {
      return ingredientCategories.map(category => ({
        ...category,
        items: category.items.filter(item => !category.nonVegetarian.includes(item))
      }));
    }
    return ingredientCategories;
  };

  const filteredCategories = searchTerm
    ? filterCategoriesByDiet().map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.items.length > 0)
    : filterCategoriesByDiet();

  return (
    <div className="lg:col-span-1">
      {/* Dietary Preferences Section - Now First */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-dark">Dietary Preferences</h2>
        <div className="space-y-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" 
              checked={dietaryPreferences.vegetarian}
              onChange={() => handleDietaryChange('vegetarian')}
            />
            <span>Vegetarian</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" 
              checked={dietaryPreferences.vegan}
              onChange={() => handleDietaryChange('vegan')}
            />
            <span>Vegan</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" 
              checked={dietaryPreferences.glutenFree}
              onChange={() => handleDietaryChange('glutenFree')}
            />
            <span>Gluten Free</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" 
              checked={dietaryPreferences.dairyFree}
              onChange={() => handleDietaryChange('dairyFree')}
            />
            <span>Dairy Free</span>
          </label>
        </div>
      </div>

      {/* Ingredients Section - Now Second */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-dark">Ingredients</h2>
        <div className="mb-4 relative" ref={dropdownRef}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search ingredients"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setShowIngredientDropdown(true)}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowIngredientDropdown(!showIngredientDropdown)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showIngredientDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
          </div>
          
          {showIngredientDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
              {filteredCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="p-2 border-b border-gray-200 last:border-b-0">
                  <h3 className="font-medium text-sm text-gray-500 mb-2 flex items-center">
                    {category.name}
                    <span className="text-xs ml-2 text-gray-400">{category.items.length} items</span>
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {category.items.map((item, itemIndex) => (
                      <label key={`${categoryIndex}-${itemIndex}`} className="flex items-center px-2 py-1 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-gray-200">
                        <input
                          type="checkbox"
                          className="form-checkbox h-3 w-3 mr-1 text-primary rounded"
                          checked={ingredients.includes(item)}
                          onChange={() => handleIngredientToggle(item)}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {ingredients.map((ingredient, index) => (
            <span key={index} className="bg-secondary bg-opacity-20 text-secondary px-3 py-1 rounded-full flex items-center">
              {ingredient}
              <button 
                onClick={() => handleIngredientToggle(ingredient)}
                className="ml-2 text-secondary hover:text-red-500"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <button 
          className="btn-primary w-full mt-6"
          onClick={handleSearch}
        >
          Generate Recipes
        </button>
      </div>
    </div>
  );
};

export default RecipeSearch;