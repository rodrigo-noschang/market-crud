import { getRepository } from "typeorm"
import { Cart, Product } from "../entities"
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

export const insertProductServices = async (product_id: string, cart_id: string) => {
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne({
        where: {
            product_id: product_id
        }
    })

    const cartRepository = getRepository(Cart);
    const cart = await cartRepository.findOne({
        where: {
            id: cart_id
        }
    });

    if (cart && product) {
        cart.products = [...cart.products, product];
        await cartRepository.save(cart);
    }
    return product;
}

export const getAllCartsServices = async () => {
    const cartRepository = getRepository(Cart);
    const carts = await cartRepository.find();

    return carts;
}

export const getCartByIdServices = async (cartId: string) => {
    const cartRepository = getRepository(Cart);
    const cart = await cartRepository.findOne({
        where: {
            id: cartId
        }
    })
    return cart;
}