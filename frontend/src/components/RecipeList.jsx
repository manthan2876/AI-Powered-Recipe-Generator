import { Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, pantryCount }) => {
  return (
    <>
      <h4>Suggested Recipes</h4>
      <p className="text-muted">
        Based on your {pantryCount} pantry item(s).
      </p>

      <Row xs={1} md={2} xl={3} className="g-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Col key={recipe._id}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))
        ) : (
          <Col>
            <p>Select ingredients from the left to see recipe suggestions.</p>
          </Col>
        )}
      </Row>
    </>
  );
};

export default RecipeList;