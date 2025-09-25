import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, ListGroup, Badge, Spinner, Alert } from 'react-bootstrap';
import { getShoppingLists, createShoppingList, deleteShoppingList } from '../../api/shoppingLists';
import ShoppingListDetail from './ShoppingListDetail';

const ShoppingList = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    fetchShoppingLists();
  }, []);

  const fetchShoppingLists = async () => {
    try {
      setLoading(true);
      const data = await getShoppingLists();
      setShoppingLists(data);
      setError(null);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    try {
      const newList = await createShoppingList({ name: newListName });
      setShoppingLists([...shoppingLists, newList]);
      setNewListName('');
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleDeleteList = async (id) => {
    try {
      await deleteShoppingList(id);
      setShoppingLists(shoppingLists.filter(list => list._id !== id));
      if (selectedList && selectedList._id === id) {
        setSelectedList(null);
      }
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleSelectList = (list) => {
    setSelectedList(list);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Shopping Lists</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Your Shopping Lists</Card.Header>
            <Card.Body>
              <Form onSubmit={handleCreateList} className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="New shopping list name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                  Create New List
                </Button>
              </Form>
              
              {shoppingLists.length === 0 ? (
                <p className="text-center text-muted">No shopping lists yet</p>
              ) : (
                <ListGroup>
                  {shoppingLists.map((list) => (
                    <ListGroup.Item
                      key={list._id}
                      action
                      active={selectedList && selectedList._id === list._id}
                      className="d-flex justify-content-between align-items-center"
                      onClick={() => handleSelectList(list)}
                    >
                      {list.name}
                      <div>
                        <Badge bg="info" className="me-2">
                          {list.items.length} items
                        </Badge>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteList(list._id);
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          {selectedList ? (
            <ShoppingListDetail
              list={selectedList}
              onUpdate={() => fetchShoppingLists()}
            />
          ) : (
            <Card className="text-center p-5">
              <Card.Body>
                <h3>Select a shopping list or create a new one</h3>
                <p className="text-muted">
                  Manage your shopping lists and generate lists from your favorite recipes
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ShoppingList;