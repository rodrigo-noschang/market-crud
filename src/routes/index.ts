import { Express } from "express"
import { userRouter } from "./user.router";
import { productRouter } from "./product.router";

export const initializeRouter = (app: Express) => {
    app.use('/', userRouter());
    app.use('/', productRouter());
}