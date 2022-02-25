import { Express } from "express"
import { userRouter } from "./user.router";
import { productRouter } from "./product.router";
import { cartRouter } from "./cart.router";
import { buyRouter } from "./buy.router";
import { emailRouter } from "./email.router";

export const initializeRouter = (app: Express) => {
    app.use('/', userRouter());
    app.use('/', productRouter());
    app.use('/', cartRouter());
    app.use('/', buyRouter());
    app.use('/', emailRouter());
}