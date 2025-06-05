import React, { useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import '../App.css';


export default function Logout() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUser({});
    navigate("/login");
  }, [setUser, navigate]);

  return (
    <div className="form-container">
      <h3 className="form-title">Logging out...</h3>
    </div>
  );
}