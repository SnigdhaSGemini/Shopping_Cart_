import express from 'express';
import { isAdmin, isSignedIn } from '../middlewares/authMiddleware.js';
import { OrdersCtrl, categoryFilterCtrl, createProductCtrl, deleteProductCtrl, getAllProductCtrl, getProductCtrl, paginationCtrl, productCountCtrl, productFiltersCtrl, productImageCtrl, searchProductCtrl, updateProductCtrl } from '../controllers/productCtrl.js';
import formidable from 'express-formidable';
const route = express.Router();

// create
route.post("/create-product", isSignedIn, isAdmin, formidable(), createProductCtrl);


// get all
route.get("/all-product",getAllProductCtrl)

// get one
route.get("/get-product/:slug",getProductCtrl)

// get image
route.get("/product-image/:id", productImageCtrl)

// delete
route.delete("/delete-product/:id",deleteProductCtrl)

// update
route.put("/update-product/:id", isSignedIn, isAdmin, formidable(), updateProductCtrl)

// filter
route.post("/product-filters",productFiltersCtrl);

// product count
route.get("/product-count",productCountCtrl)

// products per chunk
route.get("/pagination/:page",paginationCtrl);

// search
route.get("/search/:key", searchProductCtrl);

// category filter
route.get("/category-product/:slug",categoryFilterCtrl)

// orders
route.post("/orders/", isSignedIn, OrdersCtrl);

export default route