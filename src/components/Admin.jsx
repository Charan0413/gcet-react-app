import React from "react";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
export default function Admin() {
  const { user, setUser } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const API = import.meta.env.VITE_API_URL;
  const fetchUser = async () => {
    const url = `${API}/users/all`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setUsers(res.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    const url = `${API}/users/${id}`;
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    fetchUser();
  };
  const handleSubmit = async () => {
    //setUsers([...users, user]);
    try {
      const url = `${API}/users/register`;
      await axios.post(url, user);
      fetchUser()
    } catch (err) {
      console.log(err);
    }
    
  };
  return (
    <div>
      <h2>User Management</h2>
      <p>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Email address"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setUser({ ...user, pass: e.target.value })}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Role"
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
      {users &&
        users.map((user) => (
          <div>
            {user.name}-{user.email}-{user.role}-
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </div>
        ))}
        <hr />
        <h2>Product Management</h2>
    </div>
  );
}