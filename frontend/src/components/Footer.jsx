import React from "react";

function Footer() {
  return (
    <footer className="footer p-6" style={{ background: 'var(--card)', color: 'var(--muted)' }}>
      <small>&copy; {new Date().getFullYear()} RecipeApp. All rights reserved.</small>
    </footer>
  );
}

export default Footer;
