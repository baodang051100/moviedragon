import User from "../models/User.js";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

//REGISTER
export const createUser = async (req, res) => {
    const newUer = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.TOKEN_SECRET_KEY).toString(), //encrypt pasword from password and secret key in .env files
        profilePic: req.body.profilePic,
        isAdmin: req.body.isAdmin,
    });

    //Check input required
    if (!(newUer.username && newUer.email && newUer.password)) {
        return res.status(400).json({ success: false, message: "All input required" });
    };

    //Check new User email as email in db
    const oldUser = User.findOne({ email: req.body.email });
    if (newUer.email === oldUser) {
        return res.status(401).json({ success: false, message: "User already exist. Please login" });
    };

    try {
        const saveUser = await newUer.save();
        res.status(200).json(saveUser)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Register User Failed. Try agian"
        })
    }
};

//LOGIN
export const loginUser = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email });

        //check email user correct or incorrect in db
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User isn't Found"
            });
        };

        //decrypt password
        const checkCorrectPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.TOKEN_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        //check password correct or incorrect
        if (checkCorrectPassword !== req.body.password) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            })
        };

        //create jwt token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "5d" }
        );
        const { password, ...info } = user._doc;

        //set token in the browser cookies and send the response to the client
        res.cookie(
            "accessToken",
            token,
            { httpOnly: true, expires: token.expiresIn }
        ).status(200).json({
            token,
            data: { ...info },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Login to Failed. Try again"
        });
    }
}
