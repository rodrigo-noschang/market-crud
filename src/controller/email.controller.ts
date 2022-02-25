import { Request, Response } from "express"
import { getRepository } from "typeorm";
import { User } from "../entities";
import RandomCode from "../entities/RandomCode";
import { sendAnyEmail } from "../services/emailServices";
import { getUserInfoService } from "../services/userService";
import * as bcrypt from 'bcryptjs';

export const emailUser = (req: Request, res: Response) => {
    const { user_email, email_subject, email_text, isAdmin } = req.body; // No corpo da requisição devem ser passados o email do usuário, o assunto do email e o texto dele
    if (isAdmin) sendAnyEmail(user_email, email_subject, email_text);
    return res.json({message: `email sent to ${user_email}`});
}

export const recoverPassword = async (req: Request, res: Response) => {
    const thisUser = await getUserInfoService(req.body.userId);
    
    const codeRepository = getRepository(RandomCode);
    const newCodeData = {user: thisUser};
    const newCode = codeRepository.create(newCodeData);
    await codeRepository.save(newCode);
    
    const message = `Seu código para alteração de senha è ${newCode.recoveryCode}`;
    sendAnyEmail(thisUser?.user_email, "Código de recuperação", message);
    return res.json({"message": `recovery code was sent to ${thisUser?.user_email}`})
}

export const changePassword = async (req: Request, res: Response) => {
    const user = await getUserInfoService(req.body.userId);
    const {password_code, new_password, new_password_confirm} = req.body;
    const codeRepository = getRepository(RandomCode);
    const randomCode = await codeRepository.findOne({
        where: {
            randomCode: password_code
        }
    });

    if (randomCode && user) {
        user.user_password = bcrypt.hashSync(new_password, 10);
        const userRepository = getRepository(User);
        await userRepository.save(user);
        await codeRepository.remove(randomCode);
        return res.json({
            message: "password updated successfully",
            data: user
        });
    }

    return res.status(400).json({'error': 'code incorrect or non existing'});

}