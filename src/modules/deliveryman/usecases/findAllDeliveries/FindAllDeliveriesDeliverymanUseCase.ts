import { prisma } from "../../../../database/prismaClient"




class FindAllDeliveriesDeliverymanUseCase {
    async execute(id_deliveryman: string) {
        const deliveries = await prisma.deliveryman.findMany({
            where: {
                id: id_deliveryman
            },
            select: {
                username: true,
                id: true,
                Deliveries: true

            }
        });
        return deliveries;
    }
}

export { FindAllDeliveriesDeliverymanUseCase }