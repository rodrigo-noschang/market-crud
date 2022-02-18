import { getRepository } from "typeorm"
import { Cart } from "../entities"

export const createCartService = async () => {
    const cartRepository = getRepository(Cart);
    const newCart = cartRepository.create();
    console.log(newCart);
    await cartRepository.save(newCart);
    return newCart;
}