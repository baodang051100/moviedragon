import MyList from "../models/MyList.js";
import User from "../models/User.js"

//ADD
export const addMyList = async (req, res) => {
    try {
        const isAddMovie = await MyList.findOne({
            user: req.user.id,
            movieId: req.body.movieId
        })

        if (isAddMovie) return res.status(200).json({ success: false, msg: "Movie is existed in your list!" })

        const addMovie = new MyList({
            ...req.body,
            user: req.user.id
        })
        const saveMovie = await addMovie.save();

        if (req.user.id) {
            const user = User.find({ _id: req.user.id });
            await user.updateOne({ $push: { watchlists: saveMovie } })
        }
        res.status(201).json({ success: true, msg: "Add movie to your list success!", info: saveMovie })
    } catch (err) {
        res.status(400).json({ success: false, err })
    }
}

//REMOVE
export const removeMovieFromMyList = async (req, res) => {
    try {
        await MyList.findByIdAndDelete(req.params.id);
        await User.updateMany(
            { watchlists: req.params.id },
            { $pull: { watchlists: req.params.id } }
        )
        res.status(201).json({ success: true, msg: "Delete movie success!" })
    } catch (err) {
        res.status(400).json({ success: false, msg: "Delete movie falied!", err })
    }
}

//GET
export const getInfoMyList = async (req, res) => {
    try {
        const getInfo = await MyList.findById(req.params.id);
        res.status(201).json(getInfo)
    } catch (err) {
        res.status(400).json({ success: false, err })
    }
}