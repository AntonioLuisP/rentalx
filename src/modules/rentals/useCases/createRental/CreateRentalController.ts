import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const { car_id } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    await createRentalUseCase.execute({
      user_id: id,
      car_id,
    });

    return response.status(201).send();
  }
}

export { CreateRentalController };
