import { Router } from "express";
import { createUser } from "../controller/user.controller";

const router = Router();

export const userRouter = () => {
    router.post("/user", createUser);
    return router;
}