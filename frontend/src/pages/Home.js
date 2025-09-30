import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <section className="hero-section">
          <h1>Welcome to Your Recipe & Shopping List App</h1>
          <p>Organize your meal planning and shopping with ease.</p>
          <a href="/recipes" className="btn-primary">Browse Recipes</a>
          <a href="/shopping-lists" className="btn-secondary">Your Shopping Lists</a>
        </section>

        <section className="features-section">
          <h2>Features</h2>
          <ul>
            <li>Save and manage your favorite recipes</li>
            <li>Create shopping lists automatically from chosen recipes</li>
            <li>Generate recipes using AI based on ingredients you have</li>
            <li>User authentication and personalized accounts</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <p>
            Our app simplifies meal planning by combining recipe management and shopping list generation in one powerful, easy to use tool.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
