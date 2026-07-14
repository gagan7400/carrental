const mongoose = require("mongoose");

let connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected Successfully")
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB;
// mongodb driver
//mongoose driver (odm)object data modeling/modeler