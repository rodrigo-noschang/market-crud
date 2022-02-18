import { Express } from "express"
import { userRouter } from "./user.router";

export const initializeRouter = (app: Express) => {
    app.use('/', userRouter());
}