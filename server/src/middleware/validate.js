function validateCustomer(req, res, next) {
  const { first_name, last_name, email, department } = req.body;

  if (!first_name) {
    return res.status(400).json({ error: "name is required" });
  }
  if (!last_name) {
    return res.status(400).json({ error: "phone is required" });
  }
  if (!email) {
    return res.status(400).json({ error: "email is required" });
  }
  if (!department) {
    return res.status(400).json({ error: "company is required" });
  }
  


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "invalid email format" });
  }

  
  next();
}

module.exports = { validateCustomer };
