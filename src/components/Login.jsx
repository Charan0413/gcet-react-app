import React, { useContext, useState } from "react";
import { AppContext } from "../App"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../App.css';

export default function Login() {
  const { setUser } = useContext(AppContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(""); 
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    const url = `${API}/login`;

    try {
     
      const response = await axios.post(url, { email, password });

      if (response.data.token) {
        setUser(response.data); 
        navigate("/");
      } else {
        setMsg("Invalid User or Password");
      }
    } catch (error) {
      setMsg("Login failed. Please try again.");
      console.error(error);
    }
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <div className="form-container">
      <h3 className="form-title">Login</h3>

      {msg && <p className="error-msg">{msg}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Submit</button>

      <button
        style={{ marginTop: "12px", backgroundColor: "#f9dcdc", color: "#d86c7a" }}
        onClick={handleCreateAccount}
      >
        Create Account
      </button>
    </div>
  );
}