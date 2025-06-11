import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js'

// @desc   fetch all products 
// @route GET /api/products
//@access public
const getProducts =asyncHandler (async (req ,res) => {
    const products = await Product.find({});

    res.json(products);
}) 


// @desc   fetch all products 
// @route GET /api/products/:id
//@access public
const getProductbyId =asyncHandler (async (req ,res) => {
    const product= await Product.findById(req.params.id)

    if(product) {
        res.json(product);
    }else{
        res.status(404);
        throw new Error('resource not found');
    }  
}) 
export {getProducts,getProductbyId};