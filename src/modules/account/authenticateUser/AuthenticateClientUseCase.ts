import { prisma } from "../../../database/prismaClient"
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IAuthenticateClient {
    username: string;
    password: string;
}


class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        });
        if (!client) {
            throw new Error("user name or password invalid")
        }
        const passwordMatch = await compare(password, client.password);
        if (!passwordMatch) {
            throw new Error("user name or password invalid");
        }

        const token = sign({ username }, "54c8a3c45ba130876d93b1a56a80cdee", {
            subject: client.id,
            expiresIn: "1d"
        });
        return token;
    }
}
export { AuthenticateClientUseCase }