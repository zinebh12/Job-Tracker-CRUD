import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import {
  applicationSchema,
  updateApplicationSchema,
} from "./../schemas/applicationSchema.js";
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
    const validatedData = applicationSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.issues,
      });
    }
    const { company, position, location, status, date_applied, salary, notes } =
      validatedData.data;

    const result = await pool.query(
      `INSERT INTO applications
       (company, position, location, status, date_applied, salary, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [company, position, location, status, date_applied, salary, notes],
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//PATCH
app.patch("/api/applications/:id", async (req, res) => {
  try {
    const validatedData = updateApplicationSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.issues,
      });
    }
    const { id } = req.params;
    const { company, position, location, status, date_applied, salary, notes } =
      validatedData.data;
    const updateApplication = await pool.query(
      `UPDATE applications
       SET
         company = COALESCE($1, company),
         position = COALESCE($2, position),
         location = COALESCE($3, location),
         status = COALESCE($4, status),
         date_applied = COALESCE($5, date_applied),
         salary = COALESCE($6, salary),
         notes = COALESCE($7, notes)
       WHERE id = $8
       RETURNING *`,
      [company, position, location, status, date_applied, salary, notes, id],
    );

    if (updateApplication.rows.length === 0) {
      return res.status(404).send("Application not found");
    }

    res.json(updateApplication.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Failed to update application");
  }
});

//DELETE
app.delete("/api/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid application ID",
      });
    }
    const deleteApplication = await pool.query(
      "DELETE FROM applications WHERE id = $1 RETURNING *",
      [id],
    );
    res.json(deleteApplication.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Failed to delete application");
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
