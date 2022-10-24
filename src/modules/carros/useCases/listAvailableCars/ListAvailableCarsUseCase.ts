import { inject, injectable } from "tsyringe";

import { Car } from "@modules/carros/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/carros/repositories/ICarsRepository";

interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      category_id,
      name
    );
    return cars;
  }
}

export { ListAvailableCarsUseCase };
