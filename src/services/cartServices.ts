import { getRepository } from "typeorm"
import { Cart } from "../entities"
import { IUserDB } from "../types/datastypes";

export const createCartService = async (user: IUserDB) => {
    const cartData = {
        user: user
    }
    const cartRepository = getRepository(Cart);
    const newCart = cartRepository.create(cartData);
    await cartRepository.save(newCart);
    return newCart;
}