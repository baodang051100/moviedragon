import MyList from "../models/MyList.js";
import User from "../models/User.js"

//ADD
export const addMyList = async (req, res) => {
    try {
        const isAddMovie = await MyList.findOne({
            user: req.user.id,
            movieId: req.body.movieId
        })

        if(isAddMovie) return res.status(200).json({ success: true, isAddMovie })

        const addMovie = new MyList({
            ...req.body,
            user: req.user.id
        })

        const saveMovieId = await addMovie.save();

        if (req.user.id) {
            const user = User.findById(req.body.user);
            await user.updateOne({ $push: { myList: saveMovieId } })
        }
        res.status(201).json({ success: true, saveMovieId })
    } catch (err) {
        res.status(400).json({ success: false, err })
    }
}

//REMOVE
export const removeFavorite = async (req, res) => {
    try {
        await MyList.findByIdAndDelete(req.params.movieId)
        res.status(201).json({ success: true })
    } catch (err) {
        res.status(400).json({ success: false, err })
    }
}