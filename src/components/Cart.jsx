import React, { useContext } from "react";
import { AppContext } from "../App";
import '../App.css';

export default function Cart() {
  const { cart } = useContext(AppContext);

  return (
    <div className="form-container">
      <h3 className="form-title">Cart List</h3>
      {cart.length === 0 ? (
        <p style={{ color: "#d86c7a" }}>Your Cart is empty :)</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((item, index) => (
            <li key={index} style={{ margin: "10px 0" }}>
              <strong>{item.name}</strong>: ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}