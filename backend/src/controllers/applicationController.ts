import type { Request, Response } from "express";
import {
  applicationQuerySchema,
  applicationSchema,
  updateApplicationSchema,
  deleteApplicationsSchema,
} from "../../schemas/applicationSchema.js";
import { pool } from "../db.js";
import type { authRequest } from "../middleware/authMiddleware.js";
export const getApplications = async (req: authRequest, res: Response) => {
  try {
    const validatedQuery = applicationQuerySchema.safeParse(req.query);
    if (!validatedQuery.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validatedQuery.error.issues,
      });
    }
    const { status, location, search, page, limit } = validatedQuery.data;

    if (!req.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // let query = await pool.query(
    //   `SELECT * FROM applications WHERE user_id=$1`,
    //   [user_id],
    // );
    const conditions: string[] = ["user_id = $1"];
    const values: (string | number)[] = [req.userId];

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

    // if (conditions.length > 0) {
    //   query += ` WHERE ${conditions.join(" AND ")}`;
    // }
    // const countQuery = query.replace("SELECT *", "SELECT COUNT(*) AS total");
    const whereClause = `WHERE ${conditions.join(" AND ")}`;
    // Count applications belonging to this user
    const countQuery = ` SELECT COUNT(*) AS total FROM applications ${whereClause} `;
    const countResult = await pool.query(countQuery, values);
    const total = Number(countResult.rows[0].total);

    // query += " ORDER BY created_at DESC";

    //pagination
    const offset = (page - 1) * limit;
    const query = ` SELECT * FROM applications ${whereClause} ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2} `;
    // query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    const paginationValues = [...values, limit, offset];

    const applications = await pool.query(query, paginationValues);
    const totalPages = Math.ceil(total / limit);

    // Total applications by status
    const statsQuery = `
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (
          WHERE status IN ('Applied', 'Interview', 'Offer')
        ) AS active,
        COUNT(*) FILTER (
          WHERE status = 'Applied'
        ) AS applied,
        COUNT(*) FILTER (
          WHERE status = 'Interview'
        ) AS interview,
        COUNT(*) FILTER (
          WHERE status = 'Offer'
        ) AS offer,
        COUNT(*) FILTER (
          WHERE status = 'Rejected'
        ) AS rejected
      FROM applications
      WHERE user_id = $1
    `;

    const statsResult = await pool.query(statsQuery, [req.userId]);

    const stats = {
      total: Number(statsResult.rows[0].total),
      active: Number(statsResult.rows[0].active),
      applied: Number(statsResult.rows[0].applied),
      interview: Number(statsResult.rows[0].interview),
      offer: Number(statsResult.rows[0].offer),
      rejected: Number(statsResult.rows[0].rejected),
    };

    res.json({
      applications: applications.rows,
      pagination: {
        page,
        total,
        limit,
        totalPages,
      },
      stats,
    });
    // console.log(applications.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch applications",
    });
  }
};

//GET by ID
export const getApplicationById = async (req: authRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid application ID",
      });
    }
    const application = await pool.query(
      "SELECT * FROM applications WHERE id = $1 AND user_id = $2",
      [id, req.userId],
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
};

//POST
export const createApplication = async (req: authRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
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
       (company, position, location, status, date_applied, salary, notes, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        company,
        position,
        location,
        status,
        date_applied,
        salary,
        notes,
        req.userId,
      ],
    );
    return res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to create application",
    });
  }
};

//PATCH
export const updateApplication = async (req: authRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
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
       WHERE id = $8 AND user_id = $9
       RETURNING *`,
      [
        company,
        position,
        location,
        status,
        date_applied,
        salary,
        notes,
        id,
        req.userId,
      ],
    );

    if (updateApplication.rows.length === 0) {
      return res.status(404).json({
        error: "Application not found",
      });
    }

    return res.json(updateApplication.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to update application",
    });
  }
};

//DELETE
export const deleteApplication = async (req: authRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid application ID",
      });
    }
    const deleteApplication = await pool.query(
      "DELETE FROM applications WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.userId],
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
};

//DELETE mutiple
export const deleteMultipleApplications = async (
  req: authRequest,
  res: Response,
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const validatedData = deleteApplicationsSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validatedData.error.issues,
      });
    }
    const { ids } = validatedData.data;
    const result = await pool.query(
      `DELETE FROM applications
       WHERE id = ANY($1::int[]) 
       AND user_id = $2
       RETURNING *`,
      [ids, req.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "No applications found",
      });
    }
    res.json({
      message: "Applications deleted successfully",
      deletedCount: result.rows.length,
      applications: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete application",
    });
  }
};
