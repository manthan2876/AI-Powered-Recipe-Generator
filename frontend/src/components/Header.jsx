import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../services/auth";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      logoutUser();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e0e0e0',
      padding: '12px 20px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        {/* Left Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
          {/* Logo */}
          <Link to="/" style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#333',
            textDecoration: 'none'
          }}>
            CookToGo
          </Link>

        </div>

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

          {/* Auth Buttons */}
          {user ? (
            <>
              <Link to="/profile" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
                color: '#666',
                textDecoration: 'none'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#666',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f5f5f5';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link
                to="/login"
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#666',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f5f5f5';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4caf50',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#45a049';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#4caf50';
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
