import { Request, Response } from "express";
import { UpdateDelyverymanUseCase } from "./UpdateDeliveryUseCase";





class UpdateDelyverymanController {
    async handle(request: Request, response: Response) {
        const { id_deliveryman } = request;
        const { id: id_delivery } = request.params;

        const updateDeliverymanUseCase = new UpdateDelyverymanUseCase()
        const delivery = await updateDeliverymanUseCase.execute({ id_deliveryman, id_delivery });

        return response.json(delivery);
    }
}
export { UpdateDelyverymanController }