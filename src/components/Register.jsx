import React, { useContext, useState } from "react";
import { AppContext } from "../App"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../App.css';

export default function Register() {
  const { setUsers } = useContext(AppContext); // eslint-disable-line no-unused-vars
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
  const user = { name, email, password };
 

  try {
    const url = `${API}/register`;
    const response = await axios.post(url, user);// eslint-disable-line no-unused-vars


    navigate("/login");
  } catch (err) {
    console.error("Error:", err.response?.data || err.message); 
    setMsg("Registration failed. Please try again.");
  }
};


  return (
    <div className="form-container">
      <h3 className="form-title">Register</h3>

      {msg && <p className="error-msg">{msg}</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
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
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}