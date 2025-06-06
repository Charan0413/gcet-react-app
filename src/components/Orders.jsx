import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./Product.css"; 

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
    <div className="form-container" style={{ maxWidth: "700px" }}>
      <h3 className="form-title">My Orders</h3>

      {orders.length === 0 ? (
        <p style={{ color: "#d86c7a" }}>No orders placed yet.</p>
      ) : (
        <>
          <div className="product-grid">
            {orders.map((order) => (
              <div key={order.id} className="product-card">
                <h4>Order #{order.id}</h4>
                <p>Total: ${order.total.toFixed(2)}</p>
                <ul style={{ listStyle: "circle", paddingLeft: "20px", textAlign: "left" }}>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} - ${item.price} × {item.quantity || 1}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h4 style={{ marginTop: "20px", color: "#d86c7a" }}>
            Total Order Value: ${totalOrderValue.toFixed(2)}
          </h4>
        </>
      )}
    </div>
  );
}