import { getRepository } from "typeorm"
import { Cart, User } from "../entities"
import { CartList, ICartDB, IUserDB } from "../types/datastypes"
import { sendAnyEmail } from "../services/emailServices";

export const finishPurchaseEmail = (user: IUserDB | undefined) => {
    const itemsList = getAllItemsFromCart(user?.cart);
    const totalPrice = getTotalPrice(itemsList);
    const itemsString = itemsList?.map(product => product.name.toLowerCase()).join(', ');

    const emailString = `Sua compra na Kenzie Mart foi finalizada.\nVocê comprou os seguintes itens ${itemsString}.\nO valor total da compra foi de R$${totalPrice}.`

    sendAnyEmail(user?.user_email, "Compra finalizada", emailString);
}

export const getAllItemsFromCart = (cart: ICartDB | undefined) => {
    const filtered = cart?.products.map(product => {
        return {
            name: product.product_name,
            description: product.product_description,
            price: product.price
        }
    })
    
    return filtered;
}

export const getTotalPrice = (cartList: CartList[] | undefined) => {
    const totalPrice = cartList?.reduce((total, cartItem) => {
        return total + cartItem.price
    }, 0)
    return totalPrice;
}

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
        return user;
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