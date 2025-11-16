import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{
        flex: 1,
        padding: '60px 20px',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '40px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            About Us
          </h1>
          <div style={{
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.8'
          }}>
            <p style={{ marginBottom: '20px' }}>
              We solve the daily question of "What can I cook with the ingredients I have?". 
              Our unique hybrid AI acts as a reliable "workhorse" to find existing recipes that 
              minimize waste, and as a creative "innovator" to generate entirely new dishes 
              for culinary inspiration.
            </p>
            <p style={{ marginBottom: '20px' }}>
              We offer the best of both worlds: the dependability of a search engine and the 
              creative potential of a language model. Whether you're looking for tried-and-true 
              recipes or want to experiment with new flavor combinations, we've got you covered.
            </p>
            <p>
              Our mission is to help you make the most of what you have, reduce food waste, and 
              discover new culinary possibilities every day.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AboutUs;
