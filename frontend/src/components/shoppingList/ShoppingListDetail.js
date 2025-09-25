import React, { useState, useEffect } from 'react';
import { Card, Form, Button, ListGroup, Row, Col, Modal, Alert, Container } from 'react-bootstrap';
import { 
  getShoppingListById, 
  updateShoppingListItem, 
  addShoppingListItem, 
  deleteShoppingListItem,
  generateShoppingListFromRecipes
} from '../../api/shoppingLists';
import { getRecipes } from '../../api/recipes';

const ShoppingListDetail = ({ list, onUpdate }) => {
  const [currentList, setCurrentList] = useState(list);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({ ingredient: '', quantity: '' });
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  useEffect(() => {
    fetchListDetails();
  }, [list._id]);

  const fetchListDetails = async () => {
    try {
      setLoading(true);
      const data = await getShoppingListById(list._id);
      setCurrentList(data);
      setError(null);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleItemCheck = async (itemId, checked) => {
    try {
      await updateShoppingListItem(currentList._id, itemId, { checked });
      setCurrentList({
        ...currentList,
        items: currentList.items.map(item => 
          item._id === itemId ? { ...item, checked } : item
        )
      });
      onUpdate();
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.ingredient.trim() || !newItem.quantity.trim()) return;

    try {
      const updatedList = await addShoppingListItem(currentList._id, newItem);
      setCurrentList(updatedList);
      setNewItem({ ingredient: '', quantity: '' });
      onUpdate();
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteShoppingListItem(currentList._id, itemId);
      setCurrentList({
        ...currentList,
        items: currentList.items.filter(item => item._id !== itemId)
      });
      onUpdate();
    } catch (err) {
      setError(err.toString());
    }
  };

  const openGenerateModal = async () => {
    try {
      const recipesData = await getRecipes();
      setRecipes(recipesData);
      setShowGenerateModal(true);
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleRecipeSelect = (recipeId) => {
    if (selectedRecipes.includes(recipeId)) {
      setSelectedRecipes(selectedRecipes.filter(id => id !== recipeId));
    } else {
      setSelectedRecipes([...selectedRecipes, recipeId]);
    }
  };

  const handleGenerateList = async () => {
    if (selectedRecipes.length === 0) return;

    try {
      const updatedList = await generateShoppingListFromRecipes(currentList._id, selectedRecipes);
      setCurrentList(updatedList);
      setShowGenerateModal(false);
      setSelectedRecipes([]);
      onUpdate();
    } catch (err) {
      setError(err.toString());
    }
  };

  return (
    <Container>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">{currentList.name}</h4>
          <Button variant="success" onClick={openGenerateModal}>
            Generate from Recipes
          </Button>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleAddItem} className="mb-4">
            <Row>
              <Col md={5}>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Ingredient"
                    value={newItem.ingredient}
                    onChange={(e) => setNewItem({ ...newItem, ingredient: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Quantity (e.g., 2 cups)"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Button type="submit" variant="primary" className="w-100">
                  Add Item
                </Button>
              </Col>
            </Row>
          </Form>

          {currentList.items.length === 0 ? (
            <p className="text-center text-muted">No items in this shopping list</p>
          ) : (
            <ListGroup>
              {currentList.items.map((item) => (
                <ListGroup.Item
                  key={item._id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <Form.Check
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => handleItemCheck(item._id, e.target.checked)}
                      className="me-3"
                    />
                    <span style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
                      {item.ingredient} - {item.quantity}
                    </span>
                    {item.recipe && (
                      <small className="text-muted ms-2">
                        (from {item.recipe.title})
                      </small>
                    )}
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    Remove
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>

      <Modal show={showGenerateModal} onHide={() => setShowGenerateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Generate Shopping List from Recipes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select recipes to add their ingredients to your shopping list:</p>
          <ListGroup>
            {recipes.map((recipe) => (
              <ListGroup.Item
                key={recipe._id}
                action
                active={selectedRecipes.includes(recipe._id)}
                onClick={() => handleRecipeSelect(recipe._id)}
              >
                {recipe.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGenerateModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleGenerateList}
            disabled={selectedRecipes.length === 0}
          >
            Add Ingredients to List
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ShoppingListDetail;