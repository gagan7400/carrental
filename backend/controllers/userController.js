let bcrypt = require("bcrypt");
let User = require("../models/user");
var validator = require('validator');
let fs = require("fs");
let jwt = require("jsonwebtoken");
const { cloudinary } = require("..");
const { emailSendHandler } = require("../utils/emailSendHandler");
let register = async (req, res) => {
    try {

        let { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ success: false, message: "please provide all the details" })
        }
        let checkEmail = await validator.isEmail(email);
        if (!checkEmail) {
            return res.status(400).json({ success: false, message: "enter Valid Email" })
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "user already exists" })
        }

        let hashPassword = await bcrypt.hash(password, 10);

        let newuser = await User.insertOne({ userName, email, password: hashPassword });
        await emailSendHandler(email, "Registration", "<h1>thanks for registration</h1>", "thanks")

        res.status(201).json({ success: true, message: "User Successfully registerd" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
let login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let checkEmail = await validator.isEmail(email);
        if (!checkEmail) {
            return res.status(400).json({ success: false, message: "enter Valid Email" })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "user Not Found" })
        }
        let isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Pls provide valid credential" })
        }
        let token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" })

        res.cookie("token", token, { expires: new Date(Date.now() + 1 * 3600000) }).status(200).json({ success: true, data: { userName: user.userName }, message: "User Login Successfully" })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
let getprofile = async (req, res) => {
    try {

        let user = await User.findById(req.user).select(["-password"]);
        if (!user) {
            res.status(400).json({ success: false, message: "user not found" })
        }
        res.status(200).json({ success: true, data: user, message: "profile get successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
let logout = (req, res) => {
    res.cookie("token", null, { expiresIn: "0" }).json({ success: true, data: null, message: "Logout successfully" })
}
let updateProfile = async (req, res) => {
    try {
        let userId = req.user;

        let { age, photoUrl, gender, address, phoneNumber } = req.body;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ sucess: false, message: "user not found" })
        }

        let updateuser = await User.updateOne({ "_id": userId }, { "$set": { age, photoUrl, gender, address, phoneNumber } }, { new: true });

        res.status(200).json({ success: true, message: "User Update Sucessfully", data: user })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
let deleteProfile = async (req, res) => {
    try {
        let userId = req.user;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ sucess: false, message: "user not found" })
        }
        let deleteuser = await User.deleteOne({ "_id": userId });
        await emailSendHandler(user.email, "Account Delete", "<h1>Account delette</h1>", "thanks")
        res.status(200).json({ success: true, message: "User delete Sucessfully", data: deleteuser })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
let getAllusers = async (req, res) => {
    try {
        let { page } = req.query;
        //    onetime 2 users only 
        let users = []
        let totalcount = await User.countDocuments();
        if (page <= 0) {
            users = await User.find().skip(0).limit(2);
        } else {
            let newpage = totalcount % 2 + Math.floor(totalcount / 2)
            users = await User.find().skip(2 * (newpage - 1)).limit(2);
        }

        res.status(200).json({ success: true, message: "User get Sucessfully", data: users, page, totolcount: totalcount })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}


// npm i nodemon -g
module.exports = { register, login, getprofile, logout, updateProfile, deleteProfile, getAllusers }