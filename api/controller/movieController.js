import Movie from "../models/Movie.js";
import User from "../models/User.js";

//CREATE
export const createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const saveMovie = await newMovie.save();
        res.status(201).json(saveMovie);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Create failed"
        });
    };
};

//UPDATE MOVIE
export const updateMovie = async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: "Update Successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Update failed"
        });
    };
};

//DELETE MOVIE
export const deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Delete Movie Successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Delete Movie failed"
        });
    }
}

//GET A MOVIE
export const getMovie = async (req, res) => {
    try {
        const getMovie = await Movie.findById(req.params.id);
        const { ...rest } = getMovie._doc;
        res.status(200).json(rest);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Get Movie failed"
        });
    }
}

//GET ALL MOVIE
export const getAllMovie = async (req, res) => {
    const query = req.query.new;
    try {
        const getAllMovie = query
            ? await Movie.find().limit(15)
            : await Movie.find({});
        res.status(200).json(getAllMovie);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "You Are Not Allowed To See All Movie"
        });
    }
}

//GET RANDOM
export const getRandomMovie = async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } },
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } },
            ]);
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "You Are Not Allowed To See All Movie"
        });
    }
}

//SEARCH MOVIE
export const searchMovie = async (req, res) => {
    try {
        var search = req.body.search;
        var movie_data = await Movie.find({ "title": { $regex: ".*" + search + ".*" } });
        if (movie_data.length > 0) {
            res.status(200).json({ success: true, msg: "Movie details!", data: movie_data })
        } else {
            res.status(200).json({ success: true, msg: "Movie not found!" })
        }
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message })
    }
}