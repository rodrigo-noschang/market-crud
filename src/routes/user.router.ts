import { Router } from "express";
import { createUser, logUser, getUserInfo, getAllUsers } from "../controller/user.controller";
import { isSelfReference, isUserAuthenticated, isUserAdmin } from "../middlewares/userMiddlewares";

const router = Router();

export const userRouter = () => {
    router.post("/user", createUser);
    router.post("/login", logUser);
    router.get("/user/:id", isUserAuthenticated, isSelfReference, isUserAdmin, getUserInfo);
    router.get("/user", isUserAuthenticated, isUserAdmin, getAllUsers);
    return router;
}