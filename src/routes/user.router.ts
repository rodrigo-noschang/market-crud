import { Router } from "express";

const router = Router();

export const userRouter = () => {
    router.get('/', (req, res) => {
        res.json({"msg": "Deu bom aqui, gente"});
    })
    return router;
}