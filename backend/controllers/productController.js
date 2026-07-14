const Product = require("../models/product")

let createProduct = async (req, res) => {
    try {
        let newProduct = await Product.insertOne({ ...req.body });
        res.status(201).json({ success: true, message: "done", data: newProduct })
    } catch (error) {
        res.status(400).json({ sucess: false, message: error.message })
    }
}
let getProducts = async (req, res) => {
    try {
        // let newProduct = await Product.find().select(["-name"]).populate("listedBy", ["-password"]);
        // let newProduct = await Product.find({
        //     category: { "$nin": ["Stationery", "Garden"] }
        // })
        // $nin :
        // the specified field value is not in the specified array or
        // the specified field does not exist.


        // let newProduct = await Product.find({
        //    price:{ "$ne": 299 }
        // }) 
        // let newProduct = await Product.find({
        //    category:{ "$in": ["Stationery","Garden"] }
        // }) 
        // let newProduct = await Product.find({
        //    price:{ "$gte": 10 }
        // }) 
        // let newProduct = await Product.find({
        //     "$or": [
        //         { price: { "$eq": 599 } },
        //         { category: "Stationery" },
        //     ]    
        // })
        // let newProduct = await Product.find({
        //     "$and": [
        //         { price: { "$lte": 599 } },
        //         { price: { "$gte": 299 } },
        //     ]
        // })

        // insert 
        // create() .save()
        //insertOne
        //insertMany 

        // 

        res.status(201).json({ success: true, message: "done", data: newProduct, count: newProduct.length })
    } catch (error) {
        res.status(400).json({ sucess: false, message: error.message })
    }
}
let getProduct = async (req, res) => {
    try {
        let newProduct = await Product.findOne({ ...req.query })
        res.status(201).json({ success: true, message: "done", data: newProduct })
    } catch (error) {
        res.status(400).json({ sucess: false, message: error.message })
    }
}

let updateProduct = async (req, res) => {
    try {
        let { id } = req.params;
        let product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({ sucess: false, message: "Product Not found" })
        }

        // let newProduct = await Product.updateMany( {"_id":id} , { "$set": { ...req.body } })
        let newProduct = await Product.findOneAndUpdate({ "_id": id }, { ...req.body })
        res.status(201).json({ success: true, message: "done", data: newProduct })
    } catch (error) {
        res.status(400).json({ sucess: false, message: error.message })
    }
}
let deleteProduct = async (req, res) => {
    try {
        let { id } = req.params;
        // let product = await Product.findById(id);
        // if (!product) {
        //     return res.status(400).json({ sucess: false, message: "Product Not found" })
        // }

        // let newProduct = await Product.deleteOne( {"_id":id})
        // let newProduct = await Product.deleteMany( {"name":"elonmusk"})
        // let newProduct = await Product.findByIdAndDelete(id)
        let newProduct = await Product.findOneAndDelete({ "_id": id })
        res.status(201).json({ success: true, message: "done", data: newProduct })
    } catch (error) {
        res.status(400).json({ sucess: false, message: error.message })
    }
}

module.exports = { createProduct, getProducts, getProduct, updateProduct, deleteProduct }

