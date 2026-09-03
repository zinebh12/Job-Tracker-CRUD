import express from "express";
import cors from "cors";
import { pool } from "./db.js";
const app = express();

app.use(cors());
app.use(express.json());

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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
