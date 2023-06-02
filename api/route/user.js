import express from "express";
import { updateUser, deleteUser, getUser, getAllUser, getStatsUser } from "../controller/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id",verifyUser, updateUser);

//DELETE
router.delete("/:id",verifyAdmin, deleteUser);

//GET A USER
router.get("/:id",verifyAdmin, getUser);

//GET ALL
router.get("/",verifyAdmin, getAllUser);

//GET USER STATS
router.get("/stats",verifyAdmin, getStatsUser);

export default router;