import express from "express";
const router = express.Router();
import authController from "../controllers/authController";

// Auth routes

router.post("/signup", authController.handleUserSignUp);
router.post("/login", authController.handleUserLogin);

export default router;
