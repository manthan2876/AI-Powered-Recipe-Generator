import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../services/auth";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      logoutUser();
      navigate("/");
      setShowDropdown(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);
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
          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '4px',
              backgroundColor: 'transparent',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
              padding: '0',
              flexShrink: 0
            }}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {showMobileMenu ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </>
              )}
            </svg>
          </button>
          
          {/* Logo */}
          <Link to="/" style={{ 
            fontSize: 'clamp(18px, 4vw, 24px)', 
            fontWeight: 'bold', 
            color: '#333',
            textDecoration: 'none'
          }}>
            <img src="/icon.svg" alt="Logo" style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '8px' }} />
            CookToGo
          </Link>

        </div>

        {/* Desktop Right Section */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px'
        }} className="desktop-nav">

          {/* Auth Buttons */}
          {user ? (
            <>
              <div style={{ position: 'relative' }} ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: showDropdown ? '#e0e0e0' : '#f0f0f0',
                    color: '#666',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!showDropdown) {
                      e.target.style.backgroundColor = '#e0e0e0';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!showDropdown) {
                      e.target.style.backgroundColor = '#f0f0f0';
                    }
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </button>
                
                {showDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    minWidth: '200px',
                    zIndex: 1000,
                    overflow: 'hidden'
                  }}>
                    <Link
                      to="/saved-recipes"
                      onClick={() => setShowDropdown(false)}
                      style={{
                        display: 'block',
                        padding: '12px 16px',
                        color: '#333',
                        textDecoration: 'none',
                        fontSize: '14px',
                        borderBottom: '1px solid #f0f0f0',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      Favorite Recipes
                    </Link>
                    <Link
                      to="/shopping-lists"
                      onClick={() => setShowDropdown(false)}
                      style={{
                        display: 'block',
                        padding: '12px 16px',
                        color: '#333',
                        textDecoration: 'none',
                        fontSize: '14px',
                        borderBottom: '1px solid #f0f0f0',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      Shopping Lists
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      style={{
                        display: 'block',
                        padding: '12px 16px',
                        color: '#333',
                        textDecoration: 'none',
                        fontSize: '14px',
                        borderBottom: '1px solid #f0f0f0',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      Manage Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        color: '#d32f2f',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#ffebee'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
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
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
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
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
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

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 99
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 20px',
            gap: '12px'
          }}>
            {user ? (
              <>
                <Link
                  to="/saved-recipes"
                  onClick={() => setShowMobileMenu(false)}
                  style={{
                    padding: '12px 16px',
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '16px',
                    borderRadius: '4px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Favorite Recipes
                </Link>
                <Link
                  to="/shopping-lists"
                  onClick={() => setShowMobileMenu(false)}
                  style={{
                    padding: '12px 16px',
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '16px',
                    borderRadius: '4px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Shopping Lists
                </Link>
                <Link
                  to="/manage-account"
                  onClick={() => setShowMobileMenu(false)}
                  style={{
                    padding: '12px 16px',
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '16px',
                    borderRadius: '4px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Manage Account
                </Link>
                <button
                  onClick={async () => {
                    await handleLogout();
                    setShowMobileMenu(false);
                  }}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: 'transparent',
                    color: '#d32f2f',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '16px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ffebee'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setShowMobileMenu(false)}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: 'transparent',
                    color: '#666',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setShowMobileMenu(false)}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: '#4caf50',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4caf50'}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          header button[aria-label="Toggle menu"] {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          header button[aria-label="Toggle menu"] {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
