import { z } from "zod";

export const applicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().optional(),
  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]),
  date_applied: z.string().optional(),
  salary: z.number().optional(),
  notes: z.string().optional(),
});

export const updateApplicationSchema = applicationSchema.partial();

export const applicationQuerySchema = z.object({
  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]).optional(),
  location: z.string().optional(),
  search: z.string().optional(),
});
