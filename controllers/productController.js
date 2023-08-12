import slugify from "slugify";
import productModel from "../Models/productModel.js";
import categoryModel from "../Models/CategoryModel.js";
import fs from 'fs'
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, slug, quantity, shipping, category } = req.fields;
        const { photo } = req.files;
        //   validdation
        switch (true) {
            case !name:
                return res.status(200).send({ message: "Name is required" })
            case !description:
                return res.status(200).send({ message: "description is required" })
            case !price:
                return res.status(200).send({ message: "price is required" })
            case !category:
                return res.status(200).send({ message: "category is required" })
            case !quantity:
                return res.status(200).send({ message: "Quantity is required" })
            case photo && photo.size > 1000000:
                return res.status(200).send({ message: "photo is required and should be less tha 1 mb" })

        }
        const products = new productModel({
            ...req.fields, slug: slugify(name)
        });

        if (photo) {
            console.log(photo.type);
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        const product = await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            product
        })
    } catch (error) {
        console.log(`error in create product ${error}`);
        res.status(500).send({
            success: false,
            message: "Error while creaitng product",
            error
        })
    }
}
//get all products 
export const getAllProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "AllProducts",
            products,

        })
    } catch (error) {
        console.log(`error in get all product ${error}`);
        res.status(500).send({
            success: false,
            message: "Error while getting all product",
            error: error.message
        })
    }
}
//get single product
export const getSignleProduct = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await productModel.findOne({ slug: slug }).populate("category").select("-photo")
        res.status(200).send({
            success: true,
            message: "Single product Fetched",
            product
        })
    } catch (error) {
        console.log(`error in get signle product ${error}`);
        res.status(500).send({
            success: false,
            message: "Error while getting single product",
            error: error.message
        })
    }
}
//photo contoller
export const productPhotoController = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productModel.findById({ _id: pid }).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(`error while getting photo ${error}`);
        res.status(500).send({
            success: false,
            message: "Error while getting photo of product",
            error: error.message
        })
    }
}
//product delete controller
export const productDeleteController = async (req, res) => {
    try {
        const { pid } = req.params
        await productModel.findByIdAndDelete({ _id: pid })
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully"
        })
    } catch (error) {
        console.log(`error while deleting product ${error}`);
        res.status(500).send({
            success: false,
            message: "Error while deleteing  product",
            error: error.message
        })

    }
}
//update product 
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, slug, quantity, shipping, category } = req.fields;
        const { photo } = req.files;
        //   validdation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" })
            case !description:
                return res.status(500).send({ error: "description is required" })
            case !price:
                return res.status(500).send({ error: "price is required" })
            case !category:
                return res.status(500).send({ error: "category is required" })
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" })
            case photo && photo.size > 100000:
                return res.status(500).send({ error: "photo is required and should be less tha 1 mb" })

        }
        const { pid } = req.params
        const products = await productModel.findByIdAndUpdate({ _id: pid }, { ...req.fields, slug: slugify(name) }, { new: true })

        if (photo) {
            console.log(photo.type);
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        const product = await products.save();
        res.status(201).send({
            success: true,
            message: "Product update Successfully",
            product
        })
    } catch (error) {
        console.log(`error while updating product ${error}`);
        res.status(500).send({
            success: false,
            message: "Error while updating  product",
            error: error.message
        })
    }
}
//product controller
export const productFiltercontroller = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) {
            args.category = checked
        }
        if (radio.length > 0) {
            args.price = { $gte: radio[0], $lte: radio[1] }
        }
        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            products,
            countTotal: products.length
        })
        console.log("response generate");
    } catch (error) {
        console.log(`error while updating product ${error}`);
        res.status(500).send({
            success: false,
            message: "Error while updating  product",
            error: error.message
        })
    }
}
//productcountcountroller
export const productcountcountroller = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            total,
            success: true
        })
    } catch (error) {
        console.log(`error while count product ${error}`);
        res.status(400).send({
            success: false,
            message: "Error while geting count  product",
            error: error.message
        })
    }
}
//productListCountroller
export const productListCountroller = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(`error while product list per product ${error}`);
        res.status(400).send({
            success: false,
            message: "Error while geting per page product",
            error: error.message
        })
    }
}
//searchController
export const searchController = async(req,res)=>{
    try {
        const keyword = req.params.keywords
        const result = await productModel.find({
            $or:[
                {name:{$regex : keyword, $options:"i"}},
                {description:{$regex : keyword , $options:"i"}}
            ]
        }).select("-photo");
        res.json(result)

    } catch (error) {
        console.log(`error while search product ${error}`);
        res.status(400).send({
            success: false,
            message: "Error while search product",
            error: error.message
        })
    }
}
//releatedProductController
export const releatedProductController = async (req,res)=>{
    try {
        const {pid,cid}= req.params
        const products = await productModel.find({
            category:cid,
            _id:{$ne:pid}
        }).select("-photo").limit(3);
        res.status(200).send({
            products,
            success:true
        })
    } catch (error) {
        console.log(error);console.log(`error while getting releated product ${error}`);
        res.status(400).send({
            success: false,
            message: "Error while getting releated product",
            error: error.message
        })
}}
export const productCategoryController = async(req,res)=>{
    
    try {
        const category = await categoryModel.find({slug:req.params.slug});
        console.log(category);
        const product = await productModel.find({category}).populate("category")

        res.status(200).send({
            product,
            category,
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting category product",
            error: error.message
        })
    }
}