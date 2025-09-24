# User Management System

A full-stack **User Management CRUD application** built with:

- **Backend**: Node.js, Express.js, SQLite3  
- **Frontend**: React.js, Axios, React Router  
- **Features**: Add, update, delete, list, search, sort, filter, and paginate users.  

---

## Project Overview

This project demonstrates a basic **User Management System** where users can be:

- Created with first name, last name, email, and department.  
- Viewed in a paginated list with **search, filter, and sorting** options.  
- Edited and updated with live validation.  
- Deleted with immediate UI updates.  

The project uses **SQLite3** as a lightweight database and **REST APIs** for communication between backend and frontend.  

---

## Setup Instructions

### 1. Clone the repository
---
git clone <your-repo-url>
cd <your-repo-folder>

### 1. Backend Setup
---

cd server
npm install
node index.js

Backend runs at http://localhost:5000

### 1. Frontend Setup
---

cd client
npm install
npm start

Frontend runs at http://localhost:3000


## Run Instructions

### 1. Start backend
---

cd server
node index.js


### 1. Start frontend
---

cd client
npm start


## Reflections

### What went well

- Modular backend with routes, models, and middleware

- Smooth API integration with Axios on the frontend

- Responsive UI with proper validation

### Challenges

- Handling SQLite constraints like duplicate emails

- Syncing search, filter, sort, and pagination together

- Managing form validation on both client and server
