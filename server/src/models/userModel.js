const db = require("../db");

const UserModel = {
  // Get all users
  getAll: (callback) => {
    db.all("SELECT * FROM users ORDER BY created_at DESC", [], (err, users) => {
      if (err) return callback(err);
      callback(null, users);
    });
  },

  // Get single user by ID
  getById: (id, callback) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, users) => {
      if (err) return callback(err);
      callback(null, users || null);
    });
  },

  // Create user
  create: (user, callback) => {
    const {
      first_name,
      last_name,
      email,
      department,
    } = user;

    db.run(
      `INSERT INTO users (first_name, last_name, email, department) 
       VALUES (?, ?, ?, ?)`,
      [first_name, last_name, email || null, department],
      function (err) {
        if (err) return callback(err);
        UserModel.getById(this.lastID, callback);
      }
    );
  },

  // Update user
  update: (id, user, callback) => {
    const {
      first_name,
      last_name,
      email,
      department,
      
    } = user;

    db.run(
      `UPDATE users 
       SET first_name=?, last_name=?, email=?,department=? , updated_at=datetime('now') 
       WHERE id=?`,
      [first_name, last_name, email || null, department, id],
      function (err) {
        if (err) return callback(err);
        UserModel.getById(id, callback);
      }
    );
  },

  // Delete user
  delete: (id, callback) => {
    db.run("DELETE FROM users WHERE id=?", [id], function (err) {
      if (err) return callback(err);
      callback(null, { deletedId: id });
    });
  },
};

module.exports = UserModel;
