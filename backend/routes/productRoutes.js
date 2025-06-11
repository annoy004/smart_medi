import  express  from "express";
import {getProducts,getProductbyId} from '../controller/productController.js'
const router =express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductbyId);

export default router;