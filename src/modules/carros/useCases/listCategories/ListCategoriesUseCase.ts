import { inject, injectable } from "tsyringe";

import { Category } from "@modules/carros/entities/Category";
import { ICategoriesRepository } from "@modules/carros/repositories/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoriesRepository
  ) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.index();
    return categories;
  }
}

export { ListCategoriesUseCase };
