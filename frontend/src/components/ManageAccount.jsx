import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ManageAccount() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{
        flex: 1,
        padding: '40px 20px',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '40px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Manage Account
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <Link
              to="/profile"
              style={{
                display: 'block',
                padding: '16px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                color: '#333',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'background-color 0.2s',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e8f5e9'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f5f5f5'}
            >
              Edit Profile
            </Link>
            <div style={{
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              fontSize: '16px',
              color: '#666',
              textAlign: 'center'
            }}>
              Change Password (Coming Soon)
            </div>
            <div style={{
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              fontSize: '16px',
              color: '#666',
              textAlign: 'center'
            }}>
              Privacy Settings (Coming Soon)
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ManageAccount;
