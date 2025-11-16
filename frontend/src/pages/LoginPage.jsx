import React, { useState, useContext } from 'react';
import { login } from '../services/auth';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const userData = await login(data);
      loginUser(userData);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '8px'
            }}>
              Login
            </h2>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Welcome back to SuperCook.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4caf50'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4caf50'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            {error && (
              <p style={{
                color: '#ff4444',
                textAlign: 'center',
                fontSize: '14px',
                margin: '0'
              }}>
                {error}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: isLoading ? '#cccccc' : '#4caf50',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#45a049';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#4caf50';
                  }
                }}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>

          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#666',
            marginTop: '20px'
          }}>
            Don't have an account?{' '}
            <Link to="/register" style={{
              color: '#4caf50',
              fontWeight: '500',
              textDecoration: 'none'
            }}>
              Register here
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;
