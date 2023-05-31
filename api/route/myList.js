import express from "express";
import { verifyUser, verifyAdmin, verifyToken } from "../utils/verifyToken.js";
import { addMyList, removeFavorite } from "../controller/myListController.js";

const router = express.Router();
//ADD
router.post("/",verifyUser, addMyList);
//REMOVE
router.delete("/:id",verifyUser, removeFavorite);

export default router;