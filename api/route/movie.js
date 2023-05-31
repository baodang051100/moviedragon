import express from "express";
import { createMovie, deleteMovie, getAllMovie, getMovie, getRandomMovie, searchMovie, updateMovie } from "../controller/movieController.js";
import { verifyUser, verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyUser, createMovie);
//UPDATE
router.put("/:id", verifyUser, updateMovie);
//DELETE
router.delete("/:id", verifyUser, deleteMovie);
//GET
router.get("/find/:id", verifyUser, getMovie);
//GET ALL
router.get("/find/", verifyAdmin, getAllMovie);
//GET RANDOM
router.get("/random", verifyToken, getRandomMovie);
//SEARCH MOVIE
router.get("/search",verifyUser, searchMovie);

export default router;