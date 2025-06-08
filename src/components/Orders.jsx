import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "./Orders.css";

export default function Orders() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8080/orders/${user.email}`)
      .then((res) => {
        console.log("📦 Orders fetched:", res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching orders:", err);
        setOrders([]);
      });
  }, [user, navigate]);

  const totalOrderValue = orders.reduce((sum, order) => sum + order.price, 0);

  return (
    <div className="orders-container">
      <h3 className="orders-title">My Orders</h3>

      {orders.length === 0 ? (
        <p style={{ color: "#d86c7a" }}>No orders placed yet.</p>
      ) : (
        <>
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <h4>Order #{index + 1}</h4>
              <p><strong>Total:</strong> ${order.price.toFixed(2)}</p>
              <p><i>Placed on:</i> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}

          <p className="total-value">
            Total Order Value: ${totalOrderValue.toFixed(2)}
          </p>
        </>
      )}
    </div>
  );
}
