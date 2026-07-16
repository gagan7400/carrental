const express = require("express");
const path = require("path");
const app = express()
app.use(express.json());
let cors = require("cors")
let cookieParser = require("cookie-parser")
let dotenv = require("dotenv").config()
let DB = require("./config/db")
DB();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUDNAME,
    api_key: process.env.CLOUDNARY_APIKEY,
    api_secret: process.env.CLOUDNARY_APISECRET,
    secure_distribution: 'mydomain.com',
    upload_prefix: 'https://api-eu.cloudinary.com'
})

module.exports = { cloudinary }

// cloudinary.uploader.upload(path.join(__dirname,"image.png"))
// .then(result=>console.log(result)).catch((er)=>{console.log(er)});


app.use(cookieParser())
app.use(cors({
    "origin": ["https://carrental56.netlify.app"],
    credentials: true
}))

let frontendDistPath = path.join(__dirname, "../frontend/dist");
let frontendIndexPath = path.resolve(__dirname, "../frontend/dist/index.html");



let userRoute = require("./routes/userRoute");
// let orderRoute = require("./routes/orderRoute");
let productRoute = require("./routes/productRoute");

app.use("/api/products/", productRoute);
app.use("/api/users/", userRoute);
// app.use("/api/orders/", orderRoute);

app.use(express.static(frontendDistPath));
app.get("*", (req, res) => {
    res.sendFile(frontendIndexPath)
})
app.use((err, req, res, next) => {
    if (err) {
        res.status(400).json({ success: false, message: err.message })
    }
})


app.listen(process.env.PORT, (err) => { console.log(err || "server run on port 4000") });