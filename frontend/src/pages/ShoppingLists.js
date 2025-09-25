import React from 'react';
import ShoppingList from '../components/shoppingList/ShoppingList';
import { Container} from 'react-bootstrap';

const ShoppingLists = () => {
  return (
    <Container>
      <ShoppingList />
    </Container>
  );
};

export default ShoppingLists;