import { createCartService, getAllCartsServices, getCartByIdServices, insertProductServices, removeProductFromCartServices } from "../services/cartServices";
import { IUserDB } from "../types/datastypes";
import { Request, Response } from "express";

export const createCart = async () => {
    const createdCart = await createCartService(); 
    return createdCart;
}

export const insertProduct = async (req: Request, res: Response) => {
    const relation = await insertProductServices(req.body.product_id, req.body.cartId);
    return res.json(relation);
}

export const getAllCarts = async (req: Request, res: Response) => {
    if(req.body.isAdmin) {
        const cartsList = await getAllCartsServices();
        return res.json(cartsList);
    }
    return res.status(401).json({error: "only admins can see all carts"});
}

export const getCartById = async (req: Request, res:Response) => {
    const {isAdmin, isOwnCart} = req.body;
    if (isAdmin || isOwnCart) {
        const cart = await getCartByIdServices(req.params.id);
        return res.json({data: cart});
    } 
    return res.status(401).json({error: "only admins can access someone else's cart"});
}

export const removeProductFromCart = async (req: Request, res: Response) => {
    const updatedCart = await removeProductFromCartServices(req.params.product_id, req.body.userId);
    return res.json({data: updatedCart});
}