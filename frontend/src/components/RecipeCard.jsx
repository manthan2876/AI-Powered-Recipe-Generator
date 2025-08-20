import { Card, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe._id}`} className="text-decoration-none text-dark">
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
  </Link>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cookingTime: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
      })
    ).isRequired,
    dietaryTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    matchCount: PropTypes.number,
  }).isRequired,
};

export default RecipeCard;
