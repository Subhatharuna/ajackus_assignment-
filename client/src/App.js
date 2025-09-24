import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./api";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(Array.isArray(res.data) ? res.data : res.data.data || []);
  };

  const handleAdd = async (user) => {
  try {
    if (editing) {
      await updateUser(editing.id, user);
      setEditing(null);
    } else {
      await createUser(user);
    }
    fetchUsers();
    navigate("/list");
  } catch (err) {
    if (err.response && err.response.status === 409) {
      alert(err.response.data.error); // show "Email already exists"
    } else {
      alert("Something went wrong!");
    }
  }
};


  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="App">
      <nav className="nav-container">
         <h1 className="heading">User Management</h1>
         <div className="link-container">
          <Link to="/form" className="link"> Add User</Link>
          <Link to="/list" className="link"> View users</Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<UserForm onSubmit={handleAdd} initialData={editing} />}>
        </Route>
        <Route
          path="/form"
          element={<UserForm onSubmit={handleAdd} initialData={editing} />}>
        </Route>
        <Route
          path="/list"
          element={
          <UserList
              users={users}
              onEdit={(cust) => {
                setEditing(cust);
                navigate("/form");
              }}
              onDelete={handleDelete}
            />
          }>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
