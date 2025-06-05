import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios"; 
import '../App.css';
import './Product.css'

export default function Product() {
  const { user, cart, setCart } = useContext(AppContext);// eslint-disable-line no-unused-vars
  const [products, setProducts] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      console.log(API)
      const res = await axios.get(`https://gcet-node-app-two.vercel.app/products`);
     // const res = await axios.get(${API}/products);
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
      <p style={{ color: "#d86c7a" }}>Product List</p><br />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map(product => (
          <li key={product._id} style={{ margin: "10px 0" }}>
            <strong>{product.name}</strong>: ${product.price}{" "}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}