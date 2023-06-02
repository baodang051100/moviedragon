import express from "express";
import { verifyUser, verifyAdmin, verifyToken } from "../utils/verifyToken.js";
import { addMyList, getInfoMyList, removeMovieFromMyList } from "../controller/myListController.js";

const router = express.Router();
//ADD
router.post("/add/",verifyUser, addMyList);
//REMOVE
router.delete("/delete/:id",verifyUser, removeMovieFromMyList);
//GET
router.get("/get/:id",verifyUser, getInfoMyList);

export default router;