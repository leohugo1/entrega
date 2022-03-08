
import { prisma } from "../../../../database/prismaClient"
import { hash } from 'bcrypt'


interface ICreateDliveryman {
    username: string;
    password: string;
}


class CreateDeliverymanUseCase {
    async execute({ username, password }: ICreateDliveryman) {
        const deliverymanExists = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        });
        if (deliverymanExists) {
            throw new Error("deliveryman alread exists");
        }
        const hashPassword = await hash(password, 10);
        const deliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: hashPassword
            }
        });
        return deliveryman;
    }
}

export { CreateDeliverymanUseCase }