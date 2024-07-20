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

const router = Router();

//brands
router.get('/brands', brandController.getAplications);
router.get('/brands/:brand_id', brandController.getAppById);
router.post('/brands', brandController.createBrand);
router.delete('/brands/:brand_id', brandController.deleteApp);
router.put('/brands/:brand_id', brandController.updateApp);

//  brand types
router.get('/brand-types', brandTypeController.getAplications);
router.get('/brand-types/:brand_id', brandTypeController.getAppById);
router.post('/brand-types', brandTypeController.createBrand);
router.delete('/brand-types/:brand_id', brandController.deleteApp);
router.put('/brand-types/:brand_id', brandController.updateApp);

//  categories
router.get('/categories', categoriController.getAplications);
router.get('/categories/:category_id', categoriController.getAppById);
router.post('/categories', categoriController.createCategories);
router.delete('/categories/:category_id', brandController.deleteApp);
router.put('/categories/:category_id', brandController.updateApp);


//  category types
router.get('/category-types', categoriTypesController.getAplications);
router.get('/category-types/:category_id', categoriTypesController.getAppById);
router.post('/category-types', categoriTypesController.createCategories);
router.delete('/category-types/:category_id', brandController.deleteApp);
router.put('/category-types/:category_id', brandController.updateApp);

//  products
router.get('/products', productsController.getAplications);
router.get('/products/:product_id', productsController.getAppById);
router.post('/products', productsController.createProduct);
router.delete('/products/:product_id', productsController.deleteApp);
router.put('/products/:product_id', productsController.updateApp);

//  types
router.get('/types', typesController.getAplications);
router.get('/types/:type_id', typesController.getAppById);
router.post('/types', typesController.createTypes);
router.delete('/types/:type_id', typesController.deleteApp);
router.put('/types/:type_id', typesController.updateApp);


export default router;
