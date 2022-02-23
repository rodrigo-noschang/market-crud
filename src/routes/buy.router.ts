import { Router } from "express"
import { finishPurchase, getAllPurchased, getPurchaseById } from "../controller/buy.controller";
import { isOwnCart, isCartOpenBuy } from "../middlewares/cartMIddlewares";
import { isUserAdmin, isUserAuthenticated } from "../middlewares/userMiddlewares";

const router = Router();

export const buyRouter = () => {
    router.post('/buy', isUserAuthenticated, finishPurchase)
    router.get('/buy/:id', isUserAuthenticated, isUserAdmin, isOwnCart, isCartOpenBuy, getPurchaseById)
    router.get('/buy', isUserAuthenticated, isUserAdmin, getAllPurchased);
    return router;
}