// frontend/src/screens/HomeScreen.jsx

import { useSelector } from 'react-redux';
import Hero from '../components/Hero';
import GeneratorScreen from './GeneratorScreen';

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // If a user is logged in, show the Recipe Generator.
  // Otherwise, show the Hero landing page.
  return <>{userInfo ? <GeneratorScreen /> : <Hero />}</>;
};

export default HomeScreen;
