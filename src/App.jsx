import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const AppContext = createContext();

function App() {
  // Initialize user from localStorage if exists
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Cart state is user-specific, so starts empty and loads on user change
  const [cart, setCart] = useState([]);

  // Load cart from localStorage whenever user changes
  useEffect(() => {
    if (user?.email) {
      const savedCart = localStorage.getItem(`cart_${user.email}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCart([]); // no user, clear cart
    }
  }, [user]);

  // Save cart to localStorage whenever it changes (and user exists)
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  // Save user to localStorage whenever it changes (login/logout)
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // You can keep users and setUsers if needed, or remove if unused
  const [users, setUsers] = useState([]);

  return (
    <AppContext.Provider value={{ users, setUsers, user, setUser, cart, setCart }}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
