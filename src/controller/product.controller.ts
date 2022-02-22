import { Request, Response } from "express";
import { createProductService, getAllProductsService, getProductByIdService } from "../services/productServices";

export const createProduct = async (req: Request, res: Response) => {
    if(req.body.isAdmin) {
        const newProduct = await createProductService(req.body);
        return res.status(201).json({data: newProduct});
    }
    return res.status(401).json({error: "only admins can create products"});
}

export const getProductById = async (req: Request, res: Response) => {
    const product = await getProductByIdService(req.params.id);
    if (!product) return res.status(404).json({error: "product not found"});
    return res.json({data: product});
}

export const getAllProducts = async (req: Request, res: Response) => {
    const products = await getAllProductsService();

    return res.json(products);
}