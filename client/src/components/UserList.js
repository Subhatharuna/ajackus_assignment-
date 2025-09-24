import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import "./UserList.css";

const UserList = ({ users, onEdit, onDelete }) => {
  //  Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("first_name");

  //  Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  //  Sorting state 
  const [sortField, setSortField] = useState("last_name");

  // Filter + Search
  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true;
    const fieldValue = user[filterField]?.toString().toLowerCase() || "";
    return fieldValue.includes(searchTerm.toLowerCase());
  });

  // Sorting logic (asc only)
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aVal = a[sortField]?.toString().toLowerCase() || "";
    const bVal = b[sortField]?.toString().toLowerCase() || "";
    return aVal.localeCompare(bVal);
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  return (
    <div className="userList-container">
      <h2 className="list-heading">Customer List</h2>
      <div className="filter-asc-page-container">
      {/* Search + Filter controls */}
      <div className="filter-container">
        <input
          type="text"
          placeholder={`Search by ${filterField.replace("_", " ")}`}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />

        <select
          value={filterField}
          onChange={(e) => {
            setFilterField(e.target.value);
            setCurrentPage(1);
          }}
          className="filter-dropdown"
        >
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
          <option value="email">Email</option>
          <option value="department">Department</option>
        </select>
      </div>

      {/* Sorting controls */}
      <div className="sort-container">
        <label>Sort by: </label>
        <select
          value={sortField}
          onChange={(e) => {
            setSortField(e.target.value);
            setCurrentPage(1);
          }}
          className="sorting-dropdown"
        >
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
          <option value="email">Email</option>
          <option value="department">Department</option>
        </select>
       
      </div>

      {/* Pagination Controls */}
      <div className="pagination-container">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="page-button"
        >
          <FaArrowLeft />
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="page-button"
        >
          <FaArrowRight />
        </button>

        <select
          value={usersPerPage}
          onChange={(e) => {
            setUsersPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="page-dropdown"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      </div>
      {/* User List */}
      <ul className="customer-list">
        {currentUsers.length > 0 ? (
          currentUsers.map((cust) => (
            <li key={cust.id} className="list">
              <div className="name-container">
                <strong>
                  {cust.first_name} {cust.last_name}
                </strong>
              </div>
              <div className="details-container">
                - {cust.email} - {cust.department}
              </div>
              <div className="buttons-container">
                <button
                  className="edit-button"
                  onClick={() => onEdit(cust)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(cust.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <div className="no_user_found_container">
          <p className="no-results">No users found</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default UserList;
