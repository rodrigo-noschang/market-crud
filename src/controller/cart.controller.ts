import { createCartService } from "../services/cartServices";
import { IUserDB } from "../types/datastypes";

export const createCart = async (user: IUserDB) => {
    const createdCart = await createCartService(user); 
}