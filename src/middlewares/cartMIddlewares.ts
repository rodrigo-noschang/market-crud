import { Request, Response, NextFunction } from "express"
import { getRepository } from "typeorm"
import { Cart, User } from "../entities" 

export const isOwnCart = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = getRepository(User);
    const loggedUser = await userRepository.findOne({
        where: {
            id: req.body.userId
        }
    });

    req.body.isOwnCart = loggedUser?.cart.id === req.params.id;
    next();
} 

export const isCartOpenInsertDelete = async (req: Request, res:Response, next: NextFunction) => {
    const { userId } = req.body;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
        where: {
            id: userId
        }
    });

    if (user?.cart.finished) {
        return res.status(409).json({
            error: "this cart has already been closed, you can't add or remove items from it"
        });
    }

    next();
}

export const isCartOpenBuy = async (req: Request, res:Response, next: NextFunction) => {
    const cartRepository = getRepository(Cart);
    const cart = await cartRepository.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!cart?.finished) {
        return res.status(409).json({
            error: "this cart is still opened, it's not a purchase yet"
        });
    }

    next();
}