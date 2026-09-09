import { Router } from "express";
import { register, login, logout, getCurrentUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/user", authMiddleware, getCurrentUser);


export default router;
