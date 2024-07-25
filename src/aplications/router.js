// import {Router} from 'express';
// const router = Router();

// router.get('/', (req,res)=>{
//     res.send("using api")
// });


import { Router } from 'express';
import brandController from './Controller/Brands/brandController.js';
import brandTypeController from './Controller/Brands_type/brandTypeController.js';
import categoriController from './Controller/Categories/categoriController.js';
import categoriTypesController from './Controller/Brands_Category/categoriTypesController.js';
import productsController from './Controller/Products/productsController.js';
import typesController from './Controller/Types/typesController.js';
import authMiddleware from '../middleware/authMiddleware.js'
import authRole from '../middleware/authRole.js'
const router = Router();

//brands
router.get('/brands', authMiddleware, authRole('admin'), brandController.getAplications);
router.get('/brands/:brand_id', authMiddleware, authRole('admin'), brandController.getAppById);
router.post('/brands', brandController.createBrand);
router.delete('/brands/:brand_id',  authMiddleware, authRole('admin'),brandController.deleteApp);
router.put('/brands/:brand_id', brandController.updateApp);

//  brand types
router.get('/brand-types', authMiddleware, authRole('admin'), brandTypeController.getAplications);
router.get('/brand-types/:brand_id', authMiddleware, authRole('admin'), brandTypeController.getAppById);
router.post('/brand-types', brandTypeController.createBrand);
router.delete('/brand-types/:brand_id', authMiddleware, authRole('admin'), brandController.deleteApp);
router.put('/brand-types/:brand_id',  authMiddleware, authRole('admin'),brandController.updateApp);

//  categories
router.get('/categories', authMiddleware, authRole('admin'), categoriController.getAplications);
router.get('/categories/:category_id',  authMiddleware, authRole('admin'),categoriController.getAppById);
router.post('/categories', categoriController.createCategories);
router.delete('/categories/:category_id', authMiddleware, authRole('admin'), brandController.deleteApp);
router.put('/categories/:category_id', authMiddleware, authRole('admin'), brandController.updateApp);


//  category types
router.get('/category-types', authMiddleware, authRole('admin'),categoriTypesController.getAplications);
router.get('/category-types/:category_id', authMiddleware, authRole('admin'), categoriTypesController.getAppById);
router.post('/category-types', categoriTypesController.createCategories);
router.delete('/category-types/:category_id', authMiddleware, authRole('admin'), brandController.deleteApp);
router.put('/category-types/:category_id', authMiddleware, authRole('admin'), brandController.updateApp);

//  products
router.get('/products', authMiddleware, authRole('admin'), productsController.getAplications);
router.get('/products/:product_id',  authMiddleware, authRole('admin'),productsController.getAppById);
router.post('/products', productsController.createProduct);
router.delete('/products/:product_id', authMiddleware, authRole('admin'), productsController.deleteApp);
router.put('/products/:product_id', authMiddleware, authRole('admin'), productsController.updateApp);

//  types
router.get('/types', authMiddleware, authRole('admin'), typesController.getAplications);
router.get('/types/:type_id', authMiddleware, authRole('admin'), typesController.getAppById);
router.post('/types', typesController.createTypes);
router.delete('/types/:type_id', authMiddleware, authRole('admin'), typesController.deleteApp);
router.put('/types/:type_id', authMiddleware, authRole('admin'), typesController.updateApp);


export default router;
