const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/db");
const Post = require('./models/Post');
const User = require('./models/User');
const path = require("path");

const blogRoutes = require("./routes/blogRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for frontend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);
// app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("DB Error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
