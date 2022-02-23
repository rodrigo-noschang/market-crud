import { Router } from "express"
import { getAllCarts, getCartById, insertProduct, removeProductFromCart } from "../controller/cart.controller";
import { isOwnCart } from "../middlewares/cartMIddlewares";
import { getCartByUserId, isUserAuthenticated, isUserAdmin } from "../middlewares/userMiddlewares";

const router = Router();

export const cartRouter = () => {
    router.post('/cart', isUserAuthenticated, getCartByUserId, insertProduct);
    router.get('/cart', isUserAuthenticated, isUserAdmin, getAllCarts);
    router.get('/cart/:id', isUserAuthenticated, isUserAdmin, isOwnCart, getCartById);
    router.delete('/cart/:product_id', isUserAuthenticated, isUserAdmin, isOwnCart, removeProductFromCart)
    return router;
}