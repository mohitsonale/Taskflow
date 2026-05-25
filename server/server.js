const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes=require("./src/routes/authRoutes");
const taskRoutes=require("./src/routes/taskRoutes");

const pool = require("./src/config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use(cors({origin:"https://taskflow-ozh4.vercel.app"}));

pool.connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});