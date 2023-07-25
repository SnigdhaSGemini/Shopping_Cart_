import express from 'express';
import { isAdmin, isSignedIn } from '../middlewares/authMiddleware.js';
import { CreateCategoryCtrl, allCategoryCtrl, deleteCategoryCtrl, getCategoryCtrl, updateCategoryCtrl } from '../controllers/categoryCtrl.js';

const route = express.Router();

// create
route.post('/create-category',isSignedIn,isAdmin, CreateCategoryCtrl)

// update
route.put('/update-category/:slug',isSignedIn,isAdmin, updateCategoryCtrl)

// get all
route.get('/all-category/', allCategoryCtrl)

// get one
route.get('/get-category/:slug',getCategoryCtrl)

// delete
route.delete('/delete-category/:slug',isSignedIn,isAdmin, deleteCategoryCtrl)

export default route