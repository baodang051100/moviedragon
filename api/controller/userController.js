import User from "../models/User.js";
import CryptoJS from "crypto-js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";


//UPDATE
export const updateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.TOKEN_SECRET_KEY
        ).toString();
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: "Update Successfully",
            data: updateUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Update failed"
        });
    };
};

//DELETE
export const deleteUser = async (req, res) => {
    if (verifyUser) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success: true,
                message: "Delete User Successfully"
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Delete User failed"
            });
        }
    } else {
        res.status(403).json("You can delete only your account!")
    }
}

//GET AN USER
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Get User failed"
        });
    }
}


//GET ALL USER
export const getAllUser = async (req, res) => {
    const query = req.query.new;
    if (verifyAdmin) {
        try {
            const users = query
                ? await User.find().limit(10)
                : await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "You Are Not Allowed To See All User"
            });
        }
    }
}

export const getStatsUser = async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);
    const monthsArray = [
        "January",
        "February",
        "Match",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "Octorber",
        "November",
        "December"
    ];
    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            }, {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(200).json(err);
    }
}