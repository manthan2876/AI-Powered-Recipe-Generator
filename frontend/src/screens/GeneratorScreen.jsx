import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PantryBuilder from '../components/PantryBuilder';
import RecipeList from '../components/RecipeList';
import FilterBar from '../components/FilterBar';

// In a real app, this data would come from your backend API or be managed in a Redux slice.
const mockRecipes = [
    {
    _id: '1',
    title: 'Classic Chicken Stir-Fry',
    description: 'A quick and easy stir-fry, perfect for a weeknight dinner.',
    cookingTime: 25,
    ingredients: [
      { name: 'chicken breast', quantity: 2, unit: 'pcs' },
      { name: 'broccoli', quantity: 1, unit: 'head' },
      { name: 'soy sauce', quantity: 3, unit: 'tbsp' },
      { name: 'rice', quantity: 1, unit: 'cup' },
      { name: 'onion', quantity: 1, unit: 'pc' },
    ],
    dietaryTags: ['High-Protein', 'Non-Veg'],
  },
  {
    _id: '2',
    title: 'Garlic Butter Shrimp Pasta',
    description: 'A decadent and flavorful pasta dish that comes together in under 30 minutes.',
    cookingTime: 20,
    ingredients: [
      { name: 'shrimp', quantity: 1, unit: 'lb' },
      { name: 'pasta', quantity: 8, unit: 'oz' },
      { name: 'garlic', quantity: 4, unit: 'cloves' },
      { name: 'butter', quantity: 4, unit: 'tbsp' },
    ],
    dietaryTags: ['Non-Veg'],
  },
  {
    _id: '3',
    title: 'Vegan Lentil Soup',
    description: 'A hearty and nutritious soup that is both vegan and gluten-free.',
    cookingTime: 45,
    ingredients: [
      { name: 'lentils', quantity: 1, unit: 'cup' },
      { name: 'carrot', quantity: 2, unit: 'pcs' },
      { name: 'celery', quantity: 2, unit: 'stalks' },
      { name: 'vegetable broth', quantity: 6, unit: 'cups' },
      { name: 'onion', quantity: 1, unit: 'pc' },
    ],
    dietaryTags: ['Vegan', 'Vegetarian', 'Gluten-Free'],
  },
    {
    _id: '4',
    title: 'Cheesy Chicken & Rice Casserole',
    description: 'A comforting and cheesy casserole the whole family will love.',
    cookingTime: 40,
    ingredients: [
      { name: 'chicken breast', quantity: 2, unit: 'pcs' },
      { name: 'rice', quantity: 1, unit: 'cup' },
      { name: 'cheese', quantity: 2, unit: 'cups' },
      { name: 'milk', quantity: 1, unit: 'cup' },
    ],
    dietaryTags: ['Family-Friendly', 'Non-Veg'],
  },
];

const isVegan = (recipe) => {
  const nonVeganKeywords = ['chicken', 'beef', 'pork', 'fish', 'shrimp', 'egg', 'milk', 'cheese', 'butter', 'ghee', 'honey'];
  return !recipe.ingredients.some(ing =>
    nonVeganKeywords.some(keyword => ing.name.toLowerCase().includes(keyword))
  );
};

const isVegetarian = (recipe) => {
  const nonVegKeywords = ['chicken', 'beef', 'pork', 'fish', 'shrimp'];
  return !recipe.ingredients.some(ing =>
    nonVegKeywords.some(keyword => ing.name.toLowerCase().includes(keyword))
  );
};

const isNonVeg = (recipe) => {
  const nonVegKeywords = ['chicken', 'beef', 'pork', 'fish', 'shrimp'];
  return recipe.ingredients.some(ing =>
    nonVegKeywords.some(keyword => ing.name.toLowerCase().includes(keyword))
  );
};

const GeneratorScreen = () => {
  const [pantry, setPantry] = useState(['chicken breast', 'broccoli', 'rice']);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const toggleIngredient = (ingredient) => {
    const ingredientLower = ingredient.toLowerCase();
    setPantry((currentPantry) =>
      currentPantry.includes(ingredientLower)
        ? currentPantry.filter((i) => i !== ingredientLower)
        : [...currentPantry, ingredientLower]
    );
  };

  useEffect(() => {
    let results = mockRecipes
      .map((recipe) => {
        const matchCount = pantry.filter((pantryItem) =>
          recipe.ingredients.some(
            (recipeIngredient) => recipeIngredient.name.toLowerCase() === pantryItem
          )
        ).length;
        return { ...recipe, matchCount };
      })
      .filter((recipe) => recipe.matchCount > 0);

    if (activeFilter === 'Vegan') {
      results = results.filter(isVegan);
    } else if (activeFilter === 'Vegetarian') {
      results = results.filter(isVegetarian);
    } else if (activeFilter === 'Non-Veg') {
        results = results.filter(isNonVeg);
    }

    results.sort((a, b) => b.matchCount - a.matchCount);
    setFilteredRecipes(results);
  }, [pantry, activeFilter]);

  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={4}>
          <PantryBuilder pantry={pantry} onToggleIngredient={toggleIngredient} />
        </Col>
        <Col md={8}>
          <FilterBar
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
          />
          <RecipeList recipes={filteredRecipes} pantryCount={pantry.length} />
        </Col>
      </Row>
    </Container>
  );
};

export default GeneratorScreen;
