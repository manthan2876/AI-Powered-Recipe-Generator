import React from "react";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          padding: '60px 20px'
        }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '20px'
          }}>
            Welcome to Your Recipe & Shopping List App
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Organize your meal planning and shopping with ease.
          </p>
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/recipes"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                backgroundColor: '#4caf50',
                color: '#ffffff',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4caf50'}
            >
              Browse Recipes
            </Link>
            <Link
              to="/shopping-lists"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                backgroundColor: '#ffffff',
                color: '#333',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
            >
              Your Shopping Lists
            </Link>
          </div>
        </section>

        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          marginTop: '40px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '40px',
            color: '#333'
          }}>
            Features
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {[
              'Save and manage your favorite recipes',
              'Create shopping lists automatically from chosen recipes',
              'Generate recipes using AI based on ingredients you have',
              'User authentication and personalized accounts'
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: '20px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0'
                }}
              >
                <p style={{ color: '#666', lineHeight: '1.6' }}>{feature}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
