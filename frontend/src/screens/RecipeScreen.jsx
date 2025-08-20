import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, ListGroup, Card } from 'react-bootstrap';

// In a real app, you would fetch this data from your backend based on the ID
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
    instructions: [
        '1. Cut chicken into bite-sized pieces.',
        '2. Chop broccoli and onion.',
        '3. In a large skillet or wok, heat oil over medium-high heat.',
        '4. Add chicken and cook until browned.',
        '5. Add broccoli and onion and cook for 5-7 minutes, or until tender-crisp.',
        '6. Stir in soy sauce and cook for 1 minute more.',
        '7. Serve over rice.'
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
    instructions: [
        '1. Cook pasta according to package directions.',
        '2. While pasta is cooking, melt butter in a large skillet over medium-high heat.',
        '3. Add garlic and cook for 30 seconds, or until fragrant.',
        '4. Add shrimp and cook for 2-3 minutes per side, or until pink.',
        '5. Drain pasta and add to skillet with shrimp.',
        '6. Toss to combine and serve immediately.'
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
    instructions: [
        '1. In a large pot or Dutch oven, heat oil over medium heat.',
        '2. Add onion, carrots, and celery and cook for 5-7 minutes, or until softened.',
        '3. Add lentils, vegetable broth, and seasonings.',
        '4. Bring to a boil, then reduce heat and simmer for 30-40 minutes, or until lentils are tender.',
        '5. Serve hot.'
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
    instructions: [
        '1. Preheat oven to 375°F (190°C).',
        '2. In a large bowl, combine chicken, rice, cheese, and milk.',
        '3. Pour into a greased 9x13 inch baking dish.',
        '4. Bake for 25-30 minutes, or until bubbly and heated through.',
        '5. Serve hot.'
    ],
    dietaryTags: ['Family-Friendly', 'Non-Veg'],
  },
];

const RecipeScreen = () => {
  const { id: recipeId } = useParams();
  const recipe = mockRecipes.find((r) => r._id === recipeId);

  if (!recipe) {
    return <h2>Recipe not found</h2>;
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <Image src={`https://via.placeholder.com/500x400?text=${recipe.title}`} alt={recipe.title} fluid rounded />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title as="h1">{recipe.title}</Card.Title>
              <Card.Text>{recipe.description}</Card.Text>
              <hr />
              <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <h3>Ingredients</h3>
          <ListGroup variant="flush">
            {recipe.ingredients.map((ing, index) => (
              <ListGroup.Item key={index}>
                {ing.quantity} {ing.unit} {ing.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={6}>
          <h3>Instructions</h3>
          <ListGroup as="ol" numbered>
            {recipe.instructions.map((step, index) => (
              <ListGroup.Item as="li" key={index}>{step}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeScreen;
