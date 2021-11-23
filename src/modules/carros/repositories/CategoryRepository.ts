import { Category } from "../models/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

class CategoryRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  public create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  public index(): Category[] {
    return this.categories;
  }

  public findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoryRepository };
