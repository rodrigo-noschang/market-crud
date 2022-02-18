import { getRepository } from "typeorm";
import { User } from "../entities";
import { IUser } from "../types/datastypes";

export const createUserService = async (newUserData: IUser) => {
    const userRepository = getRepository(User);
    const newUser = userRepository.create(newUserData);
    await userRepository.save(newUser);

    return newUser;
}