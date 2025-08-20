import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DietaryPreferences = ({ preferences, onPreferenceChange }) => {
  const options = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Keto', 'Paleo'];

  return (
    <div>
      <h2 className="mt-5 mb-4">Dietary Preferences</h2>
      <Form.Group>
        {options.map((option) => (
          <Form.Check
            key={option}
            type="checkbox"
            id={`preference-${option}`}
            label={option}
            checked={preferences.includes(option)}
            onChange={() => onPreferenceChange(option)}
          />
        ))}
      </Form.Group>
    </div>
  );
};

DietaryPreferences.propTypes = {
  preferences: PropTypes.array.isRequired,
  onPreferenceChange: PropTypes.func.isRequired,
};

export default DietaryPreferences;
