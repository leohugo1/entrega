import { prisma } from "../../../../database/prismaClient"


interface IUpdateDeliveryman {
    id_deliveryman: string;
    id_delivery: string;
}



class UpdateDelyverymanUseCase {
    async execute({ id_delivery, id_deliveryman }: IUpdateDeliveryman) {
        const result = await prisma.deliveries.update({
            where: {
                id: id_delivery
            }, data: {
                id_deliveryman
            }
        });
        return result;
    }
}
export { UpdateDelyverymanUseCase }