let mongoose = require("mongoose");


let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true // first way to set index to any feild , it always be assending order 
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        maxLength: 200,
    },
    category: {
        type: String,
        required: true
    },
    productImage:{
        type:String,
        default:"https://picsum.photos/200/300"
    },
    // listedBy:{
    //      userName:String,
    //      email:String,
    //      phoneNumber:Number,
    // } this is embeding ,
    listedBy:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"users"//this is the collection nameof the user whose id we have prodvieded here ,
         
    }

})

// productSchema.index({price:1}) //other option ot set index
let productModel = mongoose.model("Product", productSchema)

module.exports = productModel;