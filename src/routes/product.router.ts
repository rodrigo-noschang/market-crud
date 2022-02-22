import { Router } from 'express';
import { createProduct, getAllProducts, getProductById } from '../controller/product.controller';
import { isUserAdmin, isUserAuthenticated } from '../middlewares/userMiddlewares';

const router = Router();

export const productRouter = () => {
    router.post('/product', isUserAuthenticated, isUserAdmin, createProduct);
    router.get('/product/:id', getProductById);
    router.get('/product', getAllProducts);
    return router;
}