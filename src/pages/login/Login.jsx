// src/pages/login/Login.js

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../feature/auth/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        const redirectPath = new URLSearchParams(location.search).get(
          "redirect"
        );
        navigate(redirectPath || "/product");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Dont have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
