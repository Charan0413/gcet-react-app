import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios";
import '../App.css';
import './Product.css';

export default function Product() {
  const { user, setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="form-container">
      {user && <h2 className="form-title">Welcome, {user.name}!</h2>}
      <p className="product-heading">Product List</p>

      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }}
              />
            )}
            <h3>{product.name}</h3>
            {product.description && (
              <p style={{ fontSize: "14px", color: "#555" }}>{product.description}</p>
            )}
            <p><strong>Price:</strong> ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
