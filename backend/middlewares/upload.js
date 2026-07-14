let multer = require("multer");
let path = require("path");
let uploadPath = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const prefix = Date.now()
        cb(null, prefix + file.originalname)
    }
})
const upload = multer({ storage: storage })
module.exports = {upload} ;
