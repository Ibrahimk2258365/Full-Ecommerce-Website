import slugify from "slugify";
import CategoryModel from "../Models/CategoryModel.js";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        console.log(name);
        if (!name) {
            return res.status(401).send({ message: "Name is required" })
        }
        const existingCategory = await CategoryModel.findOne({ name: name })
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: 'Category Already Exist'
            });
        }

        const category = await new CategoryModel({ name: name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: "new Category Created",
            category
        })
    } catch (error) {
        console.log(`error in create category ${error}`);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category"
        })
    }
}
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const catExist = await CategoryModel.findOne({name:name});
        if (catExist) {
            return res.status(200).send({success:false, message:"Category Already Exist"})
        }
        const category = await CategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        res.status(200).send({
            success: true,
            message: "Category updated Successfully",
            category
        })
    } catch (error) {
        console.log(`error in update category${error}`);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category"
        })
    }
}
export const categoryController = async (req, res) => {
    try {
        const category = await CategoryModel.find({})
        res.status(200).send({
            message: "All category list",
            success: true,
            category
        })
    } catch (error) {
        console.log(`error while get all categrory ${error}`);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all category"
        })
    }
}
// single category
export const singleCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await CategoryModel.findOne({ slug: slug });
        
        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category
        })
    } catch (error) {
        console.log(`error while getting single category ${error}`);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting single category"
        })
    }
}
//  deletecategory 
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await CategoryModel.findByIdAndDelete({ _id:id });
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully"
        })
    } catch (error) {
        console.log(`error while deleting single category ${error}`);
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting single category"
        })
    }
}