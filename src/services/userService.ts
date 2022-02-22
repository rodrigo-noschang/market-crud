import { getRepository } from "typeorm";
import { User } from "../entities";
import { IUserRequest, IUserLoginData, IUserDB } from "../types/datastypes";
import * as bcrypt from 'bcryptjs';
import  jwt from 'jsonwebtoken';
import { createCart } from "../controller/cart.controller";

export const createUserService = async (newUserData: IUserRequest) => {
    const userRepository = getRepository(User);
    const newUser = userRepository.create(newUserData);
    await userRepository.save(newUser);
    await createCart(newUser);

    return newUser;
}

export const logUserService = async (userData: IUserLoginData) => {
    const userRepository = getRepository(User);
    const user: IUserDB | undefined = await userRepository.findOne({
        where:{
            user_email: userData.email
        }
    })
    if (!user) return user;

    const passwordMatch = await bcrypt.compare(userData.password, user.user_password);

    if (!passwordMatch) return passwordMatch;

    const token = jwt.sign(
        {id: user.id},
        process.env.SECRET || "RANDOM_SECRET",
        {expiresIn: process.env.EXPIRES_IN}
    )
    return token;
}


export const getUserInfoService = async (userId: string) => {
    const userRepository = getRepository(User);
    const user: IUserDB | undefined = await userRepository.findOne({
        where: {
            id: userId
        }
    });
    return user;
}

export const getAllUsersService = async () => {
    const userRepository = getRepository(User);
    const usersList: IUserDB[] = await userRepository.find();

    return usersList;

}