import { Router } from "express"
import { isUserAuthenticated, isUserAdmin } from "../middlewares/userMiddlewares";
import { emailUser, recoverPassword, changePassword } from "../controller/email.controller";

const router = Router();

export const emailRouter = () => {
    router.post('/email', isUserAuthenticated, isUserAdmin, emailUser);
    router.post('/recuperar', isUserAuthenticated, recoverPassword)
    router.post('/alterar_senha', isUserAuthenticated, changePassword);


    return router;
}