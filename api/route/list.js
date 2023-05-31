import express from "express";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";
import { createList, deleteList, getAnList, getList, updateList } from "../controller/listController.js";

const router = express.Router();

//CREATE
router.post("/", verifyUser, createList);
//DELETE
router.delete("/:id", verifyUser, deleteList);
//GET All
router.get("/", verifyUser, getList);
//GET AN LIST
router.get("/:id", verifyUser, getAnList);
//UPDATE
router.put("/update/:id", verifyUser, updateList)

export default router;