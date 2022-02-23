export interface IUserRequest{
    user_name: string
    user_email: string
    user_password: string
    is_admin: boolean
}

export interface IUserDB{
    id: string
    user_name: string
    user_email: string
    user_password: string
    is_admin: boolean
    created_at: Date
    updated_at: Date
    cart: Cart
}

export interface IUserLoginData {
    email: string,
    password: string
}

export interface IProductRequest {
    product_name: string
    product_description: string
    price: number
}

export interface IProductDB {
    product_id: string
    product_name: string
    product_description: string
    created_at: Date
    updated_at: Date
    price: number
}

interface Cart {
    id: string
    products: IProductDB[]
}