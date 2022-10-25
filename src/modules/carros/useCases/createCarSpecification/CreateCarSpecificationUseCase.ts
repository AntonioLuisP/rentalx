import { inject, injectable } from "tsyringe";

import { Car } from "@modules/carros/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/carros/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/carros/repositories/ISpecificationRepository";

import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carsExists = await this.carsRepository.findById(car_id);

    if (!carsExists) {
      throw new AppError("Car Does not exists");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    carsExists.specifications = specifications;

    await this.carsRepository.create(carsExists);

    return carsExists;
  }
}

export { CreateCarSpecificationUseCase };
