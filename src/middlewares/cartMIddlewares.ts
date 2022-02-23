import { Request, Response, NextFunction } from "express"
import { getRepository } from "typeorm"
import { User } from "../entities" 

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