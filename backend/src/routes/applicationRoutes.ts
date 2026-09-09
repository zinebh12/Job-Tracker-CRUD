import { Router } from "express";
import {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
  deleteMultipleApplications,
} from "../controllers/applicationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();

router.use(authMiddleware)

router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.post("/", createApplication);
router.patch("/:id", updateApplication);
router.delete("/:id", deleteApplication);
router.delete("/", deleteMultipleApplications);

export default router;
