import slugify from "slugify";
import productModel from "../models/productModel.js"
import fs from 'fs';
import categoryModel from '../models/categoryModel.js'
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

// create
export const createProductCtrl = async (req,res) =>{
    try{
        const {name,slug,description, price,category,quantity,shipping} = req.fields;
        const {image} = req.files;

        // Validations
        switch(true){
            case !name:
                return res.status(500).send({error: "name is Required"})
            case !description:
                return res.status(500).send({error: "description is Required"})
            case !price:
                return res.status(500).send({error: "price is Required"}) 
            case !category:
                return res.status(500).send({error: "category is Required"})   
            case !quantity:
                return res.status(500).send({error: "quantity is Required"})
            case image && image.size > 1000000:
                return res.status(500).send({error: "image is Required and should be less than 1Mb"})
        }

        const createProduct = new productModel({ ...req.fields, slug: slugify(name)});
        if(image){
            createProduct.image.data = fs.readFileSync(image.path);
            createProduct.image.contentType = image.type
        }
        await createProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Created!",
            createProduct
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in Product Creation"
        })
    }
}

// get all
export const getAllProductCtrl = async (req,res) =>{
    try{
        const getAllProducts = await productModel.find({}).populate("category").select("-image").limit(12).sort({createdAt: -1});
        res.status(200).send({
            success: true,
            total: getAllProducts.length,
            message: "All Products",
            getAllProducts
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in Getting Product",
            err: err.message
        })
    }
}

// get one
export const getProductCtrl = async (req,res) =>{
    try{
        const getProduct = await productModel.findOne({slug:req.params.slug }).select("-image").populate("category");
        res.status(200).send({
            success: true,
            message: "Got Product",
            getProduct
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in Getting Product",
            err
        })
    }
}

// get image
export const productImageCtrl = async (req,res) =>{
    try{
        const getProductImage = await productModel.findById(req.params.id ).select("image");
        if(getProductImage.image.data){
            res.set('Content-type',getProductImage.image.contentType);
            return res.status(200).send(getProductImage.image.data);
        }
        
    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in Getting Product Image",
            err
        })
    }
}

// delete
export const deleteProductCtrl = async (req,res) =>{
    try{
         await productModel.findByIdAndDelete(req.params.id).select("-image");
        res.status(200).send({
            success: true,
            message: "Product Deleted"
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in Product Deletion",
            err
        })
    }
}

// update
export const updateProductCtrl = async (req,res) =>{
    try{
        const {name,slug,description, price,category,quantity,shipping} = req.fields;
        const {image} = req.files;

        // Validations
        switch(true){
            case !name:
                return res.status(500).send({error: "name is Required"})
            case !description:
                return res.status(500).send({error: "description is Required"})
            case !price:
                return res.status(500).send({error: "price is Required"}) 
            case !category:
                return res.status(500).send({error: "category is Required"})   
            case !quantity:
                return res.status(500).send({error: "quantity is Required"})
            case image && image.size > 1000000:
                return res.status(500).send({error: "image is Required and should be less than 1Mb"})
        }

        const updateProduct = await productModel.findByIdAndUpdate(req.params.id,{...req.fields, slug: slugify(name)},{new: true})
        if(image){
            updateProduct.image.data = fs.readFileSync(image.path);
            updateProduct.image.contentType = image.type
        }
        await updateProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Updated!",
            updateProduct
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in Product Updation"
        })
    }
}

// filters
export const productFiltersCtrl = async (req,res) =>{
    try{
        const {checked, radio} = req.body;
        let argument = {}
        if(checked.length > 0) {
            argument.category = checked;}
            if(radio.length){
                argument.price = {$gte: radio[0], $lte: radio[1]}
            }
            const filteredProducts = await productModel.find(argument);
            res.status(200).send({
                success: true,
                filteredProducts
            })
    }catch(err){
        console.log(err)
        res.status(400).send({
            success: false,
            message: "Error while Product Filtering",
            err
        })
    }
}

// product count
export const productCountCtrl = async (req,res) =>{
    try{
        const all = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            all
        })
    }catch(err){
        console.log(err)
        res.status(400).send({
            success: false,
            message: "Error in Product Count",
            err
        })
    }
}

// products per chunk
export const paginationCtrl = async (req,res) =>{
    try{
        const pageProduct = 4;
        const pageNo = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).select("-image").skip((pageNo-1)*pageProduct).limit(pageProduct).sort({createdAt: -1});
        res.status(200).send({
            success:true,
            products
        })
    }catch(err){
        console.log(err)
        res.status(400).send({
            success: false,
            message: "Error in Pagination",
            err
        })
    }
}

// search
export const searchProductCtrl= async (req,res) =>{
    try{
      const {key} = req.params;
      const searchProduct = await productModel.find({
        $or: [
            {name: {$regex: key, $options: "i"}},
            {description: {$regex: key, $options: "i"}}
        ]
      }).select("-image");
      res.json(searchProduct);
    }catch(err){
        console.log(err)
        res.status(400).send({
            success: false,
            message: "Error in Searching Product",
            err
        })
    }
}

// category filter
export const categoryFilterCtrl = async (req,res)=>{
    try{
        const category = await categoryModel.findOne({slug: req.params.slug});
        const products = await productModel.find({category}).populate('category');
        res.status(200).send({
            success:true,
            category,
            products
        })
    }catch(err){
        console.log(err);
        res.status(400).send({
            success: false,
            message: "Error while Getting Products By Category",
            err
        })
    }
}

// orders
export const OrdersCtrl = async (req, res) => {
      try {
    const { cart } = req.body;
        let total = 0;
          total += cart?.price;
              const order = await  new orderModel({
                products: cart,
                payment: total,
                buyer: req.user._id,
              }).save();
              res.json({ ok: true });
      } catch (error) {
        console.log(error);
      }
    };
    

