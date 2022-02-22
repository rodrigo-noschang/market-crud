import { NextFunction, Request, Response } from "express"
import { createUserService, getAllUsersService, getUserInfoService, logUserService } from "../services/userService"
import { IUserDB } from "../types/datastypes";

export const createUser = async (req: Request, res: Response) => {
    const createdUser = await createUserService(req.body);
    res.status(201).json(createdUser);
}

export const logUser = async (req: Request, res: Response) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }

    const userToken = await logUserService(userData);

    if (!userToken) {
        return res.status(404).json({"message": "wrong password or invalid email"});
    }
    return res.json({"token": userToken});
}

export const getUserInfo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { isSelfReference, isAdmin } = req.body;
    try {
        const user: IUserDB | undefined = await getUserInfoService(id);
        if ( isSelfReference || isAdmin ) {
            return res.json({data: user});
        } else {
            return res.status(401).json({error: "only admins can see other users"});
        }
    } catch (e:any) {
        if (e.code === '22P02') return res.status(404).json({error: "user not found"})
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    if (!req.body.isAdmin) return res.status(401).json({error: "only admins can see all users"});
    const users = await getAllUsersService();
    res.json({data: users});
}