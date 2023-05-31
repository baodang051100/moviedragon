import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Token is invalid" })
            }
            req.user = user
            next() //don't forget to call next
        })
    } else {
        return res.status(401).json({ success: false, message: "You're not authorticated" })
    }
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(401).json({ success: false, message: "You're not authenticated" })
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin === true) {
            next()
        } else {
            return res.status(401).json({ success: false, message: "You're not authorized" })
        }
    })
}