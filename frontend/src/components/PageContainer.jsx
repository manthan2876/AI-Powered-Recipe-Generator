import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PageContainer = ({ children, className = '' }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f5f5f5'
    }}>
      <Header />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageContainer;
