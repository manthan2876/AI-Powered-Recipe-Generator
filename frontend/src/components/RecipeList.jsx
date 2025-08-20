import { Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';
import PropTypes from 'prop-types';

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

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  pantryCount: PropTypes.number.isRequired,
};

export default RecipeList;
