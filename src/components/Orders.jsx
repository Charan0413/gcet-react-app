import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./Orders.css"; // 💡 Import the custom Amazon-like styles

export default function Orders() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = savedOrders.filter(order => order.userId === user.email);
    setOrders(userOrders);
  }, [user, navigate]);

  const totalOrderValue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="orders-container">
      <h3 className="orders-title">My Orders</h3>

      {orders.length === 0 ? (
        <p style={{ color: "#d86c7a" }}>No orders placed yet.</p>
      ) : (
        <>
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h4>Order #{order.id}</h4>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <ul className="order-items-list">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - ${item.price} × {item.quantity || 1}
                  </li>
                ))}
              </ul>
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
