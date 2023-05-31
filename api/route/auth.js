import express from "express";
import { createUser, loginUser } from "../controller/authController.js";

const router = express.Router();

//REGISTER
router.post("/register", createUser);

//LOGIN
router.post("/login", loginUser);

export default router;