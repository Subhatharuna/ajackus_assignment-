import React, { useState, useEffect } from "react";
import './UserForm.css'

const UserForm=({ onSubmit, initialData})=>{
    const [form,setForm]=useState({
      first_name: "",
      last_name: "",
      email: "",
      department: "",
    })

    useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ 
      first_name: "",
      last_name: "",
      email: "",
      department: "",
    }); 
  };

  

  return (
    <form onSubmit={handleSubmit} className="form" >
      <h2 className="from-heading">Customer Form</h2>
      <input
        className="input"
        type="text"
        name="first_name"
        placeholder="First Name"
        value={form.first_name}
        onChange={handleChange}
        required
      />

      <input
        className="input"
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={form.last_name}
        onChange={handleChange}
        required
      />
      
      <input
        className="input"
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      

      <input
        className="input"
        type="text"
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        required
      />


      <button type="submit" className="button">Save</button>
    </form>
  );
}

export default UserForm;