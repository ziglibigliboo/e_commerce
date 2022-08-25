const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");
const Apifeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");



// create product -- admin
exports.createProduct = catchAsyncErrors(
    async (req, res, next) => {

        req.body.user = req.user.id
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    });

// get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apifeatures = new Apifeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apifeatures.query;

    res.status(200).json({
        success: true,
        products,
        productCount,
    });
});

// get product detail  (get single product)
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product
    });
});

// update product -- admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    });
});

//  delete product -- admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "Product deleted"
    });
});