import { Category } from "../../models/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  public execute(): Category[] {
    const categories = this.categoryRepository.index();
    return categories;
  }
}

export { ListCategoriesUseCase };
