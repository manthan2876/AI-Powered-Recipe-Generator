import { useState } from 'react';
import { Form, Accordion, ListGroup } from 'react-bootstrap';

// Mock Data for the component
const ingredientCategories = {
  'Vegetables & Greens': [
    'carrot', 'onion', 'garlic', 'broccoli', 'spinach', 'tomato', 'celery',
  ],
  'Meat & Fish': ['chicken breast', 'ground beef', 'salmon', 'shrimp'],
  'Dairy & Eggs': ['milk', 'butter', 'cheese', 'eggs'],
  'Pantry Staples': ['rice', 'pasta', 'flour', 'sugar', 'olive oil', 'soy sauce', 'lentils'],
};

const PantryBuilder = ({ pantry, onToggleIngredient }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the ingredient list for the search bar
  const getFilteredCategories = () => {
    if (!searchTerm) {
      return ingredientCategories;
    }
    const filtered = {};
    for (const category in ingredientCategories) {
      const matchingIngredients = ingredientCategories[category].filter(
        (ingredient) =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingIngredients.length > 0) {
        filtered[category] = matchingIngredients;
      }
    }
    return filtered;
  };

  return (
    <>
      <h4>Build Your Pantry</h4>
      <p className="text-muted">Select the ingredients you have on hand.</p>

      {/* Search Bar for Ingredients */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search for an ingredient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      {/* Ingredient Categories */}
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        {Object.entries(getFilteredCategories()).map(([category, items], index) => (
          <Accordion.Item eventKey={index.toString()} key={category}>
            <Accordion.Header>{category}</Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                {items.map((item) => (
                  <ListGroup.Item
                    key={item}
                    action
                    onClick={() => onToggleIngredient(item)}
                    active={pantry.includes(item.toLowerCase())}
                    className="text-capitalize"
                  >
                    {item}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default PantryBuilder;
