import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { loginUser, registerUser } from "../services/auth";

function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const userData = await loginUser({ email: form.email, password: form.password });
        setUser(userData);
      } else {
        const userData = await registerUser({ name: form.name, email: form.email, password: form.password });
        setUser(userData);
      }
      onClose();
    } catch (err) {
      setError(err.message || "Authentication failed");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={onClose} className="close-btn">X</button>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="switch-btn">
          {isLogin ? "Need to register?" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthModal;
