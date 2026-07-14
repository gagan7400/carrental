let mongoose = require("mongoose");
let validator = require("validator")
let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxLength: 50,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Please provide valid email"
        }
    },
    password: {
        type: String,
        required: true,

    },
    age: {
        type: Number,
        min: [18, "age must be above 18"],
        max: [100, "age must be below 100"],
    },
    address: String,
    photoUrl: { type: String, default: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" },
    phoneNumber: {
        type: Number,
        validate: {
            validator: value => validator.isMobilePhone(value, "en-IN"),
            message: "pls provide valid mobile number"
        }
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    }
    ,
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin", "plususer"]
    }
}, { timestamps: true });

let userModel = mongoose.model("users", userSchema);
module.exports = userModel;


// user register
// name, email, password,.
// profile udpate :- photo, phonenumber,address,gender,age,