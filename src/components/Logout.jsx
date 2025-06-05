import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export default function Logout() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  }, []);

  return null;
}
