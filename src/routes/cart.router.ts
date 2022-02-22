import { Router } from "express"
import { getAllCarts, getCartById, insertProduct } from "../controller/cart.controller";
import { getCartByUserId, isUserAuthenticated } from "../middlewares/userMiddlewares";

const router = Router();

export const cartRouter = () => {
    router.post('/cart', isUserAuthenticated, getCartByUserId, insertProduct);
    router.get('/cart', getAllCarts);
    router.get('/cart/:id', getCartById);
    return router;
}