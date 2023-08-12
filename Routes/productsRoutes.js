import  express  from 'express';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { createProductController, getAllProductController, getSignleProduct, productCategoryController, productDeleteController, productFiltercontroller, productListCountroller, productPhotoController, productcountcountroller, releatedProductController, searchController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';
const router = express.Router();
//create product routes
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController)
// get all product 
router.get("/get-product",getAllProductController)
//single product
router.get("/get-product/:slug",getSignleProduct)
// get photo 
router.get("/product-photo/:pid",productPhotoController)
//delete prduct
router.delete("/delete-product/:pid",requireSignIn,isAdmin,productDeleteController)
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController)
//filter products
router.post("/product-filter",productFiltercontroller)
//product count 
router.get("/product-count",productcountcountroller);
//product per page
router.get("/product-list/:page",productListCountroller);
//search controller
router.get("/search/:keywords",searchController)
//similar product

router.get("/releated-product/:pid/:cid",releatedProductController);
//category wise controller
router.get("/product-category/:slug",productCategoryController)
export default router