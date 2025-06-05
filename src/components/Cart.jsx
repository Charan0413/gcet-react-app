import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import './Cart.css'; // CSS file for styling

export default function Cart() {
  const { cart, setCart, user } = useContext(AppContext);
  const [orderMsg, setOrderMsg] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const placeOrder = async () => {
    if (!user) {
      setOrderMsg("Please login to place an order.");
      return;
    }

    if (cart.length === 0) {
      setOrderMsg("Your cart is empty.");
      return;
    }

    try {
      const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
      const orderData = {
        userId: user._id,
        email: user.email,
        items: cart,
        totalPrice,
        date: new Date().toISOString(),
      };

      const res = await axios.post(`${API}/orders/new`, orderData);
      if (res.status === 201 || res.status === 200) {
        setOrderMsg("Order placed successfully!");
        setCart([]);
      } else {
        setOrderMsg("Failed to place order.");
      }
    } catch (err) {
      console.error("Order error:", err);
      setOrderMsg("Something went wrong.");
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Total:</strong> ${cart.reduce((sum, item) => sum + item.price, 0)}
          </div>
          <button onClick={placeOrder} className="place-order-btn">Place Order</button>
        </>
      )}
      {orderMsg && <p className="order-msg">{orderMsg}</p>}
    </div>
  );
}
