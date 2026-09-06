import { z } from "zod";

export const applicationSchema = z.object({
  company: z.string().min(1, "Company is required"),

  position: z.string().min(1, "Position is required"),

  location: z.string().nullable().optional(),

  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]),

  date_applied: z.string().nullable().optional(),

  salary: z.number().nullable().optional(),

  notes: z.string().nullable().optional(),
});

export const updateApplicationSchema = applicationSchema.partial();

export const applicationQuerySchema = z.object({
  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]).optional(),

  location: z.string().optional(),

  search: z.string().optional(),

  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const deleteApplicationsSchema = z.object({
  ids: z
    .array(z.number().int().positive())
    .min(1, "At least one application ID is required"),
});
