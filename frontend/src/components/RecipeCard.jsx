import { Card, Badge } from 'react-bootstrap';

const RecipeCard = ({ recipe }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text className="flex-grow-1">{recipe.description}</Card.Text>
        <div className="mb-2">
          {recipe.dietaryTags.map((tag, index) => (
            <Badge pill bg="info" key={index} className="me-1">
              {tag}
            </Badge>
          ))}
        </div>
      </Card.Body>
      <Card.Footer>
        <small className="text-success fw-bold">
          You have {recipe.matchCount} of {recipe.ingredients.length} ingredients
        </small>
      </Card.Footer>
    </Card>
  );
};

export default RecipeCard;