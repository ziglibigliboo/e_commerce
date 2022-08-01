const Product = require("../models/productModel");



// create product
exports.createProduct = async (re, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}


exports.getAllProducts = (req, res) => {

    res.status(200).json({ message: "Route is working" })
}