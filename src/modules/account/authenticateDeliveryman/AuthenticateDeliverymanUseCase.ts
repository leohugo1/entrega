
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { prisma } from '../../../database/prismaClient'
interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}


class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        });
        if (!deliveryman) {
            throw new Error("username or password invalid");
        }
        const passwordMatch = await compare(password, deliveryman.password);
        if (!passwordMatch) {
            throw new Error("username or password invalid");
        }
        const token = sign({ username }, "5c15cbdadea0b82aeb6d8b7209a04e61", {
            subject: deliveryman.id,
            expiresIn: "1d"
        });
        return token;
    }
}

export { AuthenticateDeliverymanUseCase }