import React, { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "./Product.css";

export default function Cart() {
  const { cart, setCart, user } = useContext(AppContext);
  const navigate = useNavigate();

  const updateQuantity = (index, change) => {
    const updatedCart = [...cart];
    if (!updatedCart[index].quantity) updatedCart[index].quantity = 1;
    updatedCart[index].quantity += change;

    if (updatedCart[index].quantity < 1) {
      updatedCart.splice(index, 1);
    }

    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const placeOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      // Send order to backend
      const response = await axios.post("http://localhost:8080/orders", {
        email: user.email,
        price: totalPrice,
      });

      console.log("✅ Order placed:", response.data);

      // Clear cart
      setCart([]);
      localStorage.setItem(`cart_${user.email}`, JSON.stringify([])); // Optional

      // Navigate to orders page
      navigate("/orders");
    } catch (error) {
      console.error("❌ Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: "600px" }}>
      <h3 className="form-title">Your Cart</h3>

      {cart.length === 0 ? (
        <p style={{ color: "#1e1e2f" }}>Your cart is empty</p>
      ) : (
        <>
          <div className="product-grid">
            {cart.map((item, index) => (
              <div key={index} className="product-card">
                <h4>{item.name}</h4>
                <p>${item.price}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <button onClick={() => updateQuantity(index, -1)}>-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => updateQuantity(index, 1)}>+</button>
                </div>
                <p style={{ marginTop: "10px" }}>
                  Total: ${(item.price * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <h4 style={{ marginTop: "20px", color: "#1e1e2f" }}>
            Grand Total: ${totalPrice.toFixed(2)}
          </h4>

          {user ? (
            <button onClick={placeOrder}>Place Order</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login to Order</button>
          )}
        </>
      )}
    </div>
  );
}
