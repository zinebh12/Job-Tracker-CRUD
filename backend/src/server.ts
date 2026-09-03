import express from "express";
import cors from "cors";
import { pool } from "./db.js";
const app = express();

app.use(cors());
app.use(express.json());

//GET
app.get("/api/applications", async (req, res) => {
  try {
    const applications = await pool.query("SELECT * FROM applications");
    res.json(applications.rows);
    console.log(applications.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//POST
app.post("/api/applications", async (req, res) => {
  try {
    const { company, position, location, status } = req.body;
    const newApplication = await pool.query(
      "INSERT INTO applications (company, position,location, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [company, position, location, status],
    );
    res.json(newApplication.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
