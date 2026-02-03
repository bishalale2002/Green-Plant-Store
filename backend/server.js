const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs"); // ✅ Import bcryptjs
const Admin = require("./models/Admin"); // ✅ Import your Admin model

dotenv.config();
connectDB();




const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/uploads", express.static("uploads"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.get("/", (req, res) => {
  res.send("Garden Plant Store API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});