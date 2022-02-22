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
}

export interface IUserLoginData {
    email: string,
    password: string
}