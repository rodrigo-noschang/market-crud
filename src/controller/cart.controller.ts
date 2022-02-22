import { createCartService, getAllCartsServices, getCartByIdServices, insertProductServices } from "../services/cartServices";
import { IUserDB } from "../types/datastypes";
import { Request, Response } from "express";

export const createCart = async (user: IUserDB) => {
    const createdCart = await createCartService(user); 
}

export const insertProduct = async (req: Request, res: Response) => {
    const relation = await insertProductServices(req.body.product_id, req.body.cartId);
    return res.json(relation);
}

export const getAllCarts = async (req: Request, res: Response) => {
    const cartsList = await getAllCartsServices();
    return res.json(cartsList);
}

export const getCartById = async (req: Request, res:Response) => {
    const cart = await getCartByIdServices(req.params.id);
    return res.json({data: cart});
}