export interface IUser{
    user_name: string
    user_email: string
    is_admin: boolean
    cart: ICart
}

interface ICart {
    cart_id: string
}