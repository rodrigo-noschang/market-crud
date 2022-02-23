import { Request, Response } from "express"
import { finishPurchaseServices, getAllPurchasedServices, getPurchaseByIdServices } from "../services/buyServices"

export const finishPurchase = async (req: Request, res: Response) => {
    const updatedCart = await finishPurchaseServices(req.body.userId);
    return res.json({data: updatedCart});
}

export const getPurchaseById = async (req: Request, res: Response) => {
    const { isAdmin, isOwnCart } = req.body
    const cartId = req.params.id; 
    if(isAdmin || isOwnCart) {
        const cart = await getPurchaseByIdServices(cartId)
        if (!cart) {
            return res.status(404).json({error: "cart does not existis or is still open"});
        }
        return res.json({data: cart});
    } 
    return res.status(401).json({error: "only admins can see other people's cart"});
}

export const getAllPurchased = async (req: Request, res: Response) => {
    const { isAdmin } = req.body;
    if (isAdmin) {
        const allPurchased = await getAllPurchasedServices();
        return res.json({data: allPurchased})
    }
    return res.status(401).json({error: "only admins can see all the purchases"});
}