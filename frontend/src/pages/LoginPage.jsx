import React, { useState, useContext, useEffect } from 'react';
import { login } from '../services/auth';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { API_BASE } from '../services/apiConfig';

function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginUser } = useContext(AuthContext);
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for error in URL params (from OAuth callback)
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

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

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/api/users/auth/google`;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px, 4vw, 40px) clamp(16px, 4vw, 20px)',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: 'clamp(24px, 6vw, 40px)',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{
              fontSize: 'clamp(24px, 5vw, 32px)',
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
              <div style={{ textAlign: 'right', marginTop: '8px' }}>
                <Link to="/forgot-password" style={{
                  fontSize: '14px',
                  color: '#4caf50',
                  textDecoration: 'none'
                }}>
                  Forgot Password?
                </Link>
              </div>
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

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '16px',
              gap: '12px'
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
              <span style={{ color: '#666', fontSize: '14px' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
            </div>
            
            <button
              type="button"
              onClick={handleGoogleLogin}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#ffffff',
                color: '#333',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f5f5f5';
                e.target.style.borderColor = '#d0d0d0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.borderColor = '#e0e0e0';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

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
