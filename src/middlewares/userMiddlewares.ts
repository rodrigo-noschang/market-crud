import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { getRepository } from "typeorm";
import { Cart, User } from "../entities";
import { IUserDB } from "../types/datastypes";
import { getUserInfoService } from "../services/userService";

export const isUserAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    jwt.verify(token || "", process.env.SECRET || '', (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({"error": "invalid token"});
        }

        req.body.userId = decoded.id
    });

    next();
}

export const isSelfReference = (req: Request, res: Response, next: NextFunction) => {
    req.body.isSelfReference = req.params.id === req.body.userId;
    next();
}

export const isUserAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = getRepository(User);
    const user: IUserDB | undefined = await userRepository.findOne({
        where: {
            id: req.body.userId
        }
    })
    req.body.isAdmin = user?.is_admin;
    next();
}

export const getCartByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body; // Id que vem do authenticate
    const user = await getUserInfoService(userId); // Pega o user

    const cartRepository = getRepository(Cart);
    const cart = await cartRepository.findOne({
        where:{
            user: user
        }
    })
    req.body.cartId = cart?.id;
    next();
}