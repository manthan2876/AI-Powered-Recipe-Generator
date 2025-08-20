import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import SavedRecipes from '../components/SavedRecipes';
import DietaryPreferences from '../components/DietaryPreferences';
import ProfilePicture from '../components/ProfilePicture';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setSavedRecipes(userInfo.savedRecipes || []);
    setPreferences(userInfo.preferences || []);
    setProfilePicture(userInfo.profilePicture || null);
  }, [userInfo]);

  const handlePreferenceChange = (preference) => {
    setPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((p) => p !== preference)
        : [...prev, preference]
    );
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          savedRecipes,
          preferences,
          profilePicture,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Container>
      <Row>
        <Col md={3}>
          <ProfilePicture
            profilePicture={profilePicture}
            onPictureChange={handlePictureChange}
          />
        </Col>
        <Col md={9}>
          <FormContainer>
            <h1>Update Profile</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='my-2' controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary' className='mt-3'>
                Update Profile
              </Button>
              {isLoading && <Loader />}
            </Form>
          </FormContainer>
        </Col>
      </Row>
      <Row>
        <Col>
          <DietaryPreferences
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SavedRecipes savedRecipes={savedRecipes} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
