const router = require("express").Router();
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../controllers/productController.js");
const { userAuth, checkRoles } = require("../middlewares/userMiddleware.js");

router.post("/newproduct", userAuth, checkRoles(["admin"]), createProduct)
router.get("/products", getProducts)
router.get("/getproduct", getProduct)
router.put("/updateproduct/:id", userAuth, checkRoles(["admin"]), updateProduct)
router.delete("/deleteproduct/:id", userAuth, checkRoles(["admin"]), deleteProduct)


module.exports = router 