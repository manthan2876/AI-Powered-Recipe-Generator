import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FilterBar = ({ activeFilter, onSelectFilter }) => {
  const filters = ['All', 'Vegan', 'Vegetarian', 'Non-Veg'];

  return (
    <Nav
      variant="pills"
      activeKey={activeFilter}
      className="justify-content-center mb-4"
      onSelect={onSelectFilter}
    >
      {filters.map((filter) => (
        <Nav.Item key={filter}>
          <Nav.Link eventKey={filter}>{filter}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

FilterBar.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onSelectFilter: PropTypes.func.isRequired,
};

export default FilterBar;
