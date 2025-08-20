import { Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';
import PropTypes from 'prop-types';

const SavedRecipes = ({ savedRecipes }) => {
  return (
    <div>
      <h2 className="mt-5 mb-4">Saved Recipes</h2>
      {savedRecipes.length > 0 ? (
        <Row xs={1} md={2} xl={3} className="g-4">
          {savedRecipes.map((recipe) => (
            <Col key={recipe._id}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>You have no saved recipes.</p>
      )}
    </div>
  );
};

SavedRecipes.propTypes = {
  savedRecipes: PropTypes.array.isRequired,
};

export default SavedRecipes;
