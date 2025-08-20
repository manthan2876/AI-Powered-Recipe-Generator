import { Image, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProfilePicture = ({ profilePicture, onPictureChange }) => {
  return (
    <div className="text-center">
      <Image
        src={profilePicture || 'https://via.placeholder.com/150'}
        roundedCircle
        width="150"
        height="150"
        className="mb-3"
      />
      <Form.Group>
        <Form.Label>Change Profile Picture</Form.Label>
        <Form.Control type="file" onChange={onPictureChange} />
      </Form.Group>
    </div>
  );
};

ProfilePicture.propTypes = {
  profilePicture: PropTypes.string,
  onPictureChange: PropTypes.func.isRequired,
};

export default ProfilePicture;
