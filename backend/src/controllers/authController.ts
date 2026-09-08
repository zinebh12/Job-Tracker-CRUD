import type { Request, Response } from "express";
import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { registerSchema } from "../../schemas/authSchema.js";

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validatedData.error.issues,
      });
    }
    const { name, email, password } = validatedData.data;

    const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: "User already exists!",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      "INSERT INTO users(name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
      [name, email, passwordHash],
    );
    return res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to register user",
    });
  }
};
