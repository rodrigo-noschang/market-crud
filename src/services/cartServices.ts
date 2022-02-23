import { getRepository } from "typeorm"
import { Cart, Product, User } from "../entities"
import { IUserDB, IProductDB } from "../types/datastypes";

export const createCartService = async () => {
    const cartRepository = getRepository(Cart);
    const newCart = cartRepository.create();
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

export const removeProductFromCartServices = async (productId: string, userId: string) => {
    const userRepository = getRepository(User);
    const cartRepository = getRepository(Cart);
    const user = await userRepository.findOne({
        where: {
            id: userId
        }
    });
    
    if(user) {
        user.cart.products = user?.cart.products.filter(product => product.product_id !== productId);
        console.log(user.cart.products);
        await userRepository.save(user);
        await cartRepository.save(user.cart);
    }

    return user;
}