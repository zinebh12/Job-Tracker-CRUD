import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import {
  applicationSchema,
  updateApplicationSchema,
  applicationQuerySchema,
} from "./../schemas/applicationSchema.js";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express();

app.use(cors());
app.use(express.json());

//GET
app.get("/api/applications", async (req, res) => {
  try {
    const validatedQuery = applicationQuerySchema.safeParse(req.query);
    if (!validatedQuery.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validatedQuery.error.issues,
      });
    }
    const { status, location, search } = validatedQuery.data;

    let query = "SELECT * FROM applications";
    const conditions: string[] = [];
    const values: string[] = [];

    if (status) {
      conditions.push(`status ILIKE $${values.length + 1}`);
      values.push(status);
    }
    if (location) {
      conditions.push(`location ILIKE $${values.length + 1}`);
      values.push(`%${location}%`);
    }

    if (search) {
      conditions.push(
        `(company ILIKE $${values.length + 1}
        OR position ILIKE $${values.length + 1}
        OR location ILIKE $${values.length + 1})`,
      );
      values.push(`%${search}%`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += " ORDER BY created_at DESC";
    const applications = await pool.query(query, values);

    res.json(applications.rows);
    // console.log(applications.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch applications",
    });
  }
});

//GET by ID
app.get("/api/applications/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid application ID",
      });
    }
    const application = await pool.query(
      "SELECT * FROM applications WHERE id = $1",
      [id],
    );
    if (application.rows.length === 0) {
      return res.status(404).json({
        error: "Application not found",
      });
    }
    res.json(application.rows[0]);
  } catch (err: any) {
    res.status(500).json({
      error: "Failed to fetch application",
    });
  }
});

//POST
app.post("/api/applications", async (req, res) => {
  try {
    const validatedData = applicationSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validatedData.error.issues,
      });
    }
    const { company, position, location, status, date_applied, salary, notes } =
      validatedData.data;

    const result = await pool.query(
      `INSERT INTO applications
       (company, position, location, status, date_applied, salary, notes)
       valuesS ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [company, position, location, status, date_applied, salary, notes],
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to create application",
    });
  }
});

//PATCH
app.patch("/api/applications/:id", async (req, res) => {
  try {
    const validatedData = updateApplicationSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validatedData.error.issues,
      });
    }
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid application ID",
      });
    }
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
      return res.status(404).json({
        error: "Application not found",
      });
    }

    res.json(updateApplication.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to update application",
    });
  }
});

//DELETE
app.delete("/api/applications/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid application ID",
      });
    }
    const deleteApplication = await pool.query(
      "DELETE FROM applications WHERE id = $1 RETURNING *",
      [id],
    );

    if (deleteApplication.rows.length === 0) {
      return res.status(404).json({
        error: "Application not found",
      });
    }
    res.json(deleteApplication.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to delete application",
    });
  }
});

app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
