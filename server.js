const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 5000;

const pool = mysql.createPool({
  host: "localhost",
  user: "shoeshop_user",
  password: "",
  database: "shoeshop",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/shoes", (req, res) => {
  pool.query("SELECT * FROM shoes", (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Server error");
    } else {
      res.json(results);
    }
  });
});

app.get("/api/shoes/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM shoes WHERE id = ?", [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Server error");
    } else {
      res.json(results[0]);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/api/shoes/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM shoes WHERE id = ?", [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Server error");
    } else {
      res.json(results[0]);
    }
  });
});
