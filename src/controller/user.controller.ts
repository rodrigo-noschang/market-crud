import { Request, Response } from "express"
import { createUserService } from "../services/userService"

export const createUser = async (req: Request, res: Response) => {
    const createdUser = await createUserService(req.body);
    res.json(createdUser);
}