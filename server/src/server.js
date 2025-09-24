const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require('./logger');
const { notFound, errorHandler } = require('./middleware/error');


const usersRouter = require('./routes/users');

require('./db');

const app = express();
const PORT = 5000;


// Middleware
app.use(cors({
  origin: "http://localhost:3000",   // allow React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(bodyParser.json());
app.use(logger);

app.get("/",(req,res)=>{
  res.send("Backend is Running")
})

// Routes
app.use("/api/users", usersRouter);
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
