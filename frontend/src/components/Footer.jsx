import React from "react";

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e0e0e0',
      padding: '20px',
      textAlign: 'center',
      color: '#666',
      fontSize: '14px',
      marginTop: 'auto'
    }}>
      <small>&copy; {new Date().getFullYear()} CookToGo. All rights reserved.</small>
    </footer>
  );
}

export default Footer;
