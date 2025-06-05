import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";

export default function Login() {
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API}/users/login`;
      const response = await axios.post(url, { email, pass });

      if (response.data.email) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      } else {
        setMsg("Invalid User or Password");
      }
    } catch (error) {
      setMsg("Login failed: " + error.message);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div style={{ margin: "30px" }}>
      <h3>Login</h3>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
      <p>
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
      <p>
        <button onClick={goToRegister}>Create Account</button>
      </p>
    </div>
  );
}
