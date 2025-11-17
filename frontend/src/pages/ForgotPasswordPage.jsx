import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { forgotPassword } from '../services/auth';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      const response = await forgotPassword(email);
      setSuccess(response.message || 'Password reset link has been sent. Please check your email.');
    } catch (err) {
      setError(err.message || 'Failed to send password reset email. Please try again.');
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
              Forgot Password
            </h2>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            {success && (
              <p style={{
                color: '#4caf50',
                textAlign: 'center',
                fontSize: '14px',
                margin: '0',
                padding: '12px',
                backgroundColor: '#e8f5e9',
                borderRadius: '4px'
              }}>
                {success}
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
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>

          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#666',
            marginTop: '20px'
          }}>
            Remember your password?{' '}
            <Link to="/login" style={{
              color: '#4caf50',
              fontWeight: '500',
              textDecoration: 'none'
            }}>
              Login here
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ForgotPasswordPage;

