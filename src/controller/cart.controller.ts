import { createCartService } from "../services/cartServices";

export const createCart = async () => {
    const createdCart = await createCartService(); 
}