import React, { useState, useContext } from "react";
import { register } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const [data, setData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const userData = await register({ name: data.name, email: data.email, password: data.password });
      loginUser(userData);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
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
              Create Account
            </h2>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Start your culinary journey with us.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={data.name}
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
                minLength={6}
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
                name="confirmPassword"
                placeholder="Confirm Password"
                value={data.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
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

            <div style={{ marginTop: '8px' }}>
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
                {isLoading ? 'Creating Account...' : 'Register'}
              </button>
            </div>
          </form>

          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#666',
            marginTop: '20px'
          }}>
            Already have an account?{' '}
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
