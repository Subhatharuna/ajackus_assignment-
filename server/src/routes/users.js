const express = require("express");
const { validateCustomer } = require("../middleware/validate");
const UserModel = require("../models/userModel");

const router = express.Router();

// Create new user
router.post("/", validateCustomer, (req, res, next) => {
  UserModel.create(req.body, (err, customer) => {
    if (err) return next(err);
    res.status(201).json({ message: "User created", customer });
  });
});

// Get all users
router.get("/", (req, res, next) => {
  UserModel.getAll((err, customers) => {
    if (err) return next(err);
    res.json(customers);
  });
});

// Get single user
router.get("/:id", (req, res, next) => {
  UserModel.getById(req.params.id, (err, customer) => {
    if (err) return next(err);
    if (!customer) return res.status(404).json({ error: "User not found" });
    res.json(customer);
  });
});

// Update user
router.put("/:id", validateCustomer, (req, res, next) => {
  UserModel.update(req.params.id, req.body, (err, customer) => {
    if (err) return next(err);
    res.json({ message: "User updated", customer });
  });
});

// Delete user
router.delete("/:id", (req, res, next) => {
  UserModel.delete(req.params.id, (err) => {
    if (err) return next(err);
    res.json({ message: "User deleted" });
  });
});

module.exports = router;
