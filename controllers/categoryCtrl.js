import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

// create
export const CreateCategoryCtrl = async (req,res) =>{
    try{
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message: "Name is Required"})
        }
        const isCategory = await categoryModel.findOne({name});
        if(isCategory){
            return res.status(200).send({
                success: true,
                message: "Duplicate Category!"
            })
        }
        const newCategory  = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success: true,
            message: "Category Created!",
            newCategory
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message: "Error in Category",
            err
        })
    }
}

// update
export const updateCategoryCtrl = async (req,res) =>{
    try{
        const {name} = req.body
        const updateCategory = await categoryModel.findOneAndUpdate({slug: req.params.slug} , {name, slug: slugify(name)},{new: true})
        res.status(200).send({
            success: true,
            message: "Category Updated!",
            updateCategory
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            err,
            message: "Error in category upadate"
        })
    }
}

// get all
export const allCategoryCtrl = async (req,res)  =>{
    try{
        const getAllCategory  = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All Categories",
            getAllCategory
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            err,
            message: "Error in getting all categories"
        })
    }
} 

// get one
export const getCategoryCtrl = async (req,res)  =>{
    try{
        const getCategory  = await categoryModel.findOne({slug: req.params.slug})
        res.status(200).send({
            success: true,
            message: "Get Category",
            getCategory
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            err,
            message: "Error in getting category"
        })
    }
} 

// delete
export const deleteCategoryCtrl = async (req,res)  =>{
    try{
     await categoryModel.findOneAndDelete({slug: req.params.slug})
        res.status(200).send({
            success: true,
            message: "Category Deleted"
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            err,
            message: "Error in category deletion"
        })
    }
} 