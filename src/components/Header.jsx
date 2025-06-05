import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import '../App.css';

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <header>
      <h1>React Store</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        {user ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
