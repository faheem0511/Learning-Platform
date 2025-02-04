require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Check if API is working
app.get("/", (req, res) => {
  res.send("API is working!");
});

// ✅ Sample Signup Route (No Firebase, just testing)
app.post("/signup", (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  res.json({ message: "User registered successfully", email, name });
});

// ✅ Sample Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  res.json({ message: "Login successful", email });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
