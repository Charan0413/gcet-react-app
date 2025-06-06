import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Orders from "./components/Orders";

import "./App.css";

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user?.email) {
      const savedCart = localStorage.getItem(`cart_${user.email}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const [users, setUsers] = useState([]);

  return (
    <AppContext.Provider value={{ users, setUsers, user, setUser, cart, setCart }}>
      <BrowserRouter>
        <div className="app-wrapper">
          <Header />
          <main className="main-section">
            <Routes>
              <Route path="/" element={<Product />} />
              <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={user ? <Logout /> : <Navigate to="/login" />} />
               <Route path="/orders" element={<Orders/>}/>
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
