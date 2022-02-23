import { getRepository } from "typeorm"
import { Cart, User } from "../entities"

export const finishPurchaseServices = async (userId: string) => {
    const userRepository = getRepository(User);
    const cartRepository = getRepository(Cart);

    const user = await userRepository.findOne({
        where: {
            id: userId
        }
    });

    if (user) {
        user.cart.finished = true;
        await userRepository.save(user);
        await cartRepository.save(user.cart);
        return user?.cart;
    }
    return user;
}

export const getPurchaseByIdServices = async (cartId: string) => {
    const cartRepository = getRepository(Cart)

    const cart = await cartRepository.findOne({
        where: {
            id: cartId
        }
    });

    if (cart?.finished) {
        return cart;
    } 
    return cart?.finished;
}

export const getAllPurchasedServices = async () => {
    const cartRepository = getRepository(Cart);
    const cartsPurchased = await cartRepository.find({
        where: {
            finished: true
        }
    });

    return cartsPurchased;
}