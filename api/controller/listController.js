import List from "../models/List.js";

//CREATE
export const createList = async (req, res) => {
    const newList = new List(req.body);
    try {
        const saveList = await newList.save();
        res.status(201).json(saveList);
    } catch (err) {
        res.status(404).json({ success: false, message: "Failed" });
    }
}

//DELETE
export const deleteList = async (req, res) => {
    try {
        await List.findByIdAndDelete(req.params.id);
        res.status(201).json({ success: true, message: "Successfully" });
    } catch (err) {
        res.status(404).json({ success: false, message: "Failed" });
    }
}

//GET
export const getList = async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } }
                ]);
            } else {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } }
                ]);
            }
        } else {
            list = await List.aggregate([{ $sample: { size: 10 } }]);
        }
        res.status(201).json(list);
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed" });
    }
}

//UPDATE
export const updateList = async (req, res) => {
    try {
        const dataUpdate = await List.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(dataUpdate)
    } catch (err) {
        res.status(500).json({ success: true, message: "Update Failed" })
    }
}

//GET AN LIST
export const getAnList = async (req, res) => {
    try {
        const getAnListawait = await List.findById(req.params.id);
        const { ...rest } = getAnListawait._doc;
        res.status(200).json(rest)
    } catch (err) {
        res.status(400).json({ success: true, message: "Get an list failed" })
    }
}