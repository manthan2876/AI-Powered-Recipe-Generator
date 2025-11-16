import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        {/* Hero Section */}
        <section style={{
          padding: '80px 20px',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            Cook Something Delicious with What You Have
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Enter your ingredients and find recipes you can cook at home instantly.
          </p>
          <Link
            to="/home"
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
            Get Started
          </Link>
        </section>

        {/* Features Section */}
        <section style={{
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          maxWidth: '1200px',
          margin: '0 auto'
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <div style={{
              padding: '30px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                Recipe Search
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Find recipes based on ingredients you have at home.
              </p>
            </div>
            <div style={{
              padding: '30px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                Save Favorites
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Keep your favorite recipes saved for easy access.
              </p>
            </div>
            <div style={{
              padding: '30px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                Step-by-Step Instructions
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Follow clear instructions to cook delicious meals.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section style={{
          padding: '60px 20px',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#333'
          }}>
            About Us
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.8',
            marginBottom: '30px'
          }}>
            We solve the daily question of "What can I cook with the ingredients I have?". 
            Our unique hybrid AI finds existing recipes that minimize waste, and generates 
            entirely new dishes for culinary inspiration.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
