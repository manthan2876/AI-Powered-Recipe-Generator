import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getCurrentUser } from '../services/auth';

function GoogleAuthSuccessPage() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        // Get user data from the backend (token is already in cookie)
        const userData = await getCurrentUser();
        if (userData) {
          loginUser(userData);
          navigate('/home');
        } else {
          navigate('/login?error=' + encodeURIComponent('Failed to get user data'));
        }
      } catch (error) {
        console.error('Error getting user data:', error);
        navigate('/login?error=' + encodeURIComponent('Authentication failed'));
      }
    };

    handleAuthSuccess();
  }, [navigate, loginUser]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#333', marginBottom: '16px' }}>Completing sign in...</h2>
        <p style={{ color: '#666' }}>Please wait while we sign you in.</p>
      </div>
    </div>
  );
}

export default GoogleAuthSuccessPage;

