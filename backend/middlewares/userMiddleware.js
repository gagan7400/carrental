let jwt = require("jsonwebtoken");
const User = require("../models/user");
let userAuth = async (req, res, next) => {
    let token = req.cookies.token;
    // let token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(400).json({ success: false, message: "Pls provide token" })
    }
    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(400).json({ success: false, message: "not valid token" })
    }
    let user = await User.findById(decoded.id);
    if (!user) {
        return res.status(400).json({ success: false, message: "User not Found" })
    }
    req.user = user;
    next()
}

let checkRoles = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            res.status(400).json({ success: false, message: "Access not allowed" })
        }
    }
}
module.exports = { userAuth, checkRoles }

// authentication  :- to check who you are , check its password ,  and alll
// and in  authorization :-what role are allowed to you