import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/carros/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoriesRepository
  ) {}

  public async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name
    );

    if (categoryAlreadyExists) throw new AppError("Category Already Exists!");

    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
